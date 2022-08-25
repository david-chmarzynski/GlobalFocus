import os
import json
import sys
import requests
import argparse
import re

from os import path
from os.path import isfile, join
from requests.exceptions import HTTPError

rootUrl = "https://back.globalfocus.fr/"
TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZTYzZmRkOS0zM2U2LTQ0MjgtYjM3Zi1lZTI3NWY5YzIyOTUiLCJ0eXBlIjoiQURNSU4iLCJpYXQiOjE2NTI4ODM2Mjl9.e5iFP7jwJO1dsIMKgDsaV9L8-talV4i-GMHzka7kB8U"
QUESTION_POST_URL = "questions"
MODULE_POST_URL = "modules"
CHAPTER_POST_URL = "chapters"
FORM_POST_URL = "forms"
TAG_POST_URL = "tags"

def listRessource(path: str):
    result = []
    files = [f for f in os.listdir(path) if isfile(join(path, f))]
    for f in files:
        with open(join(path, f), 'r', encoding="utf-8") as file:
            data = file.read()
            questionJSON = json.loads(data)
            result.append(questionJSON)
    return result

def createRessource(files, url, logFailure: bool = True):
    headers = {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-type': 'application/json'
    }
    createdElements = 0
    for f in files:
        try:
            res = requests.post(f"{rootUrl}{url}", json=f, headers=headers)
            if res.status_code < 200 or res.status_code > 300:
                raise Exception('', f'{res.status_code} {res.text}')
            createdElements += 1    
        except HTTPError as http_err:
            if logFailure:
                print(f'Error creating {f}')
                print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            if logFailure:
                print(f'{f["oid"]} Other error occurred: {err}')
    print(f"...{createdElements} elements created on {rootUrl}{url}")

def deleteRessource(files, url, logFailure: bool = True):
    headers = {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-type': 'application/json'
    }
    deletedRes = 0
    for f in files:
        try:
            oid = f['oid']
            res = requests.delete(f"{rootUrl}{url}/{oid}", json=f, headers=headers)
            if res.status_code < 200 or res.status_code > 300:
                raise Exception('', f'{res.status_code} {res.text}')
            deletedRes += 1    
        except HTTPError as http_err:
            if logFailure:
                print(f'Error creating {f}')
                print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            if logFailure:
                print(f'Other error occurred: {err}')
    print(f"...{deletedRes} elements deleted on {rootUrl}{url}")


def createTagFile(tag: str, filePath: str):
    if path.exists(filePath):
        return
    content = (
        f"{{"
        f'"oid": "{tag}",'
        f'"title": "{tag}",'
        f'"description": "auto generated tag"'
        f"}}"
    )
    f = open(filePath, "w")
    f.write(content)
    f.close()


def listTagsFromForm(form):
    result = []
    if not 'reportingTrees' in form:
        return result
    for tree in form['reportingTrees']:
        _listTagsFromNode(tree['reportingNode'], result)
    return result

def _listTagsFromNode(node, result):
    if not node:
        return result
    try:
        result.append(node['tagOID'])
        for child in node['children']: 
            _listTagsFromNode(child, result)
        return result    
    except Exception as err:
        print(f'Other error occurred: {err}')    
        print(f'   node {node}')    

if __name__ == "__main__":
    myDescription = '{:^100}'.format('[Global Focus CLI] form creation')
    parser = argparse.ArgumentParser(description=myDescription,
                                     epilog='Exemple : python3 main.py ',
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('-c', action='store_true', dest='create', help='create elements')
    parser.add_argument('-f', action='store_true', dest='force', help='force create elements, deleting questions / module / chapters / form if already exists')
    parser.add_argument("--list_questions_tags", action='store_true', help='list all tags from the questions in the question folder')
    parser.add_argument("--init_base_tags", action='store_true', help='init tags files from the form json tree')
    options = parser.parse_args()

    questions = listRessource("./questions")
    modules = listRessource("./modules")
    chapters = listRessource("./chapters")
    forms = listRessource("./form")
    tags = listRessource("./tags")
    baseTags = listRessource("./base_tags")
    print(f"questions to add: {len(questions)}")
    print(f"modules to add: {len(modules)}")
    print(f"chapters to add: {len(chapters)}")
    print(f"forms to add: {len(forms)}")
    print(f"tags to add: {len(forms)}")
    if options.init_base_tags:
        baseTags = []
        for form in forms: 
            baseTags.extend(listTagsFromForm(form))
        for tag in baseTags:   
            createTagFile(tag, f"./base_tags/{tag}.json")
        print(f"   ...created {len(baseTags)} tags") 
    if options.list_questions_tags:
        print(f"----------------------------------------")
        print(f"List all tags from your questions       ")
        print(f"----------------------------------------")
        tags = []
        for question in questions: 
            if 'scores' in question:
                for score in question['scores']:
                    tags.append(score['tagOID']) if score['tagOID'] not in tags else tags 
        for tag in tags: 
            print(f"   ...{tag}\r\n")
        sys.exit()
    # -----------------------
    # force OPTION ---------
    # -----------------------
    if options.force:
        print("... force mode [ON]")
        for module in modules:
            if 'calculations' in module:
                deleteRessource(module['calculations'], QUESTION_POST_URL)
        deleteRessource(questions, QUESTION_POST_URL)
        deleteRessource(modules, MODULE_POST_URL)
        deleteRessource(chapters, CHAPTER_POST_URL)
        deleteRessource(forms, FORM_POST_URL)
    # -----------------------
    # CREATE OPTION ---------
    # -----------------------
    if options.create:
        print("-----------------------")
        print("... creating ressources")
        print("-----------------------")
        createRessource(tags, TAG_POST_URL, logFailure=False)
        createRessource(baseTags, TAG_POST_URL, logFailure=False)
        createRessource(questions, QUESTION_POST_URL)
        createRessource(modules, MODULE_POST_URL)
        createRessource(chapters, CHAPTER_POST_URL)
        createRessource(forms, FORM_POST_URL)


