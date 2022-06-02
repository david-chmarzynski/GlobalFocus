# Notice

## Générateur JSON

1. yarn && yarn start
2. Entrez le formulaire sur l'application (http://localhost:3000)
3. Une fois terminé, téléchargez le fichier proposé
4. Importer ce fichier dans le dossier GlobalFocus/Generator/redux et s'assurer de ne pas avoir de dossier "form_components" déjà présent
5. Entrez la commande node formGenerator.js
6. Saisissez le nom du fichier JSON sans l'extension ".json" (exemple: Q1_test)
7. Effectuez les modifications à l'intérieur des fichiers si nécessaire
8. cd form_components && python3 ./main.py -c -f (pour envoyer sur le serveur)

## Vérification/Modifications fichiers

### Form :

- Supprimer le champ "companyId" si non utilisé
- reportingNode:
  - Supprimer les tags inutiles (à ne pas afficher dans le sunburst)
  - Vérifier les ranges => min et max = INT

### Modules

- Vérifier les isGlobal si nécessaire
- Corriger les triggers

### Questions

- Corriger "exclusive" emplacement
