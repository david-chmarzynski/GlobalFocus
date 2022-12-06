import os
import subprocess

rootdir = '.'
for file in os.listdir(rootdir):
    d = os.path.join(rootdir, file)
    if os.path.isdir(d) and d != ".\\utils" and d != ".\\0 Complet Q1":
        print(f"----------PUSHING {d} DIR------------")
        os.chdir(d)
        os.system("python test.py -c -f")
        os.chdir("..")
for file in os.listdir(rootdir):
    d = os.path.join(rootdir, file)
    if os.path.isdir(d) and d == ".\\0 Complet Q1":
        print(f"----------PUSHING {d} DIR------------")
        os.chdir(d)
        os.system("python test.py -c -f")
        os.chdir("..")