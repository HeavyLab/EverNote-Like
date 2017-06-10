# Evernote-Like

Projet réalisé avec Meteor : https://www.meteor.com/


### Pourquoi l'utilisation de Meteor:

Javascript est un langage qui prend de plus en plus d'ampleur avec le développement de puissant framework tels que Angular, React ou Meteor. Bien que Meteor n'est pas aussi répandu qu'Angular ou React, c'est un langage sur lequel nous avions déjà travaillé lors d'un projet personnel, nous nous sommes donc tous naturellement vers celui ci puisque nous avions déjà quelques connaissances et que nous voulions les approfondir.


### Installer le projet:

1. se rendre dans le fichier où l'on veut créer le projet et entrer la commande:
  ```
  git clone https://github.com/MatthiasCruciani/EverNote-Like.git
  ```
  
2. se rendre dans le fichier ainsi créé contenant le projet, et entrer la commande qui va installer les dépendances et les packages nécessaires pour le faire tourner:
  ```
  meteor npm install
  ```
  
3. il faut ensuite d'entrer la commande suivante afin de lancer le projet, puis se rendre ensuite sur la page http://localhost:3000/:
  ```
  meteor
  ```
  
  
### Packages ajoutés

- **accounts-ui** : Permet d'intégrer un formulaire de connexion/déconnexion
- **accounts-password** : Gère l'inscription, la connexion et la déconnexion d'un utilisateur
- **juliancwirko:s-alert** : Une gestion des alert javascript
- **juliancwirko:s-alert-genie** : Un thème pour les alerts du package juliancwirko:s-alert
- **twbs:bootstrap** : Bootstrap
- **iron:router** : Permet la gestion d'applications web avec plusieurs vues (redirection en fonction de l'url)
- **momentjs:moment** : Gestion des dates, permet de aisément les formater


### Structure du projet

#### client

- **main.css** : le css de l'application
- **main.html** : definition du template principal de l'application qui va être appelé par le router pour y intégrer les autres templates
- **main.js** : définition des routes du router

#### imports

- **api/notes.js** : DAO. Définition de toutes les methodes qui interagissent avec la table notes, comme l'insertion, la mise à jour et la suppression de données
- **startup/accounts-config.js** : configuration du package accounts-ui (inscription et connexion à partir du nom d'utilisateur et non de l'adresse mail)
- **ui/body.html** : déclaration des principaux templates qui vont être intégrés dans le template principal
- **ui/body.js** : gestion des templates (ex: les évènements...) présents dans ui/body.html (nottament la recherche)
- **ui/note.html** : template d'affichage d'une note
- **ui/note.js** : gestion du template note présent dans ui/note.html

#### server

- **main.js** : import du fichier de DAO présent dans client/main.js, afin que le server puisse faire les recherches dans la base de données et communiquer les résultats directement aux templates concernés
