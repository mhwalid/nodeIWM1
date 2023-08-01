# Node IWM1 - Civilisation

## Architecture du projet

Pour le projet nous nous sommes inspirées du pattern MVC (Modèle Vue Controller)

```
|_Rendu TP
	|_ config/
		|-- db.config.ts 	--> Connexion à la BDD MongoDB
		|-- logger.ts 		--> Création du logger winston
	|_ logs/       		--> Fichiers de logs
	|_ node_modules/    
	|_ test/       		--> Fichiers de test
	|_ src/
		|_ /controllers     --> Controllers de l'application
		|_ /middleware  	--> Middleware pour l'authentification
		|_ /models     		--> Modeles de données pour respecter une structure de nos documents MongoDB
		|_ /routes     		--> Déclaration des routes de l'application
		|_ /services 		--> Services qui intéraggissent avec la BDD via mongoose
		|-- app.ts			--> Point d'entrée de l'application où est lancée la BDD, les logs, le middleware et les routes
```

Pour chaque collection il y un contrôleur, un service et un modèle.

## Modèles de donnée

Nous avons choisi de partir sur des données simples mais qui utilise plusieurs types différents. Nous avons donc des humains qui ont des animaux et des utilisateurs qui eux sont utilisés uniquement pour l'authentification sur le serveur.

```
export interface IAnimals {
    name: string,
    age: number,
    isDomestic: boolean,
}

export interface IHumans {
    name: string,
    age: number,
    city: string,
    birthDate: Date,
    isWorking: boolean,
    salary: number,
    animals: IAnimals[]
}

export interface IUser {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthday: Date,
    isAdmin: Boolean,
}
```

## Lancer le projet

Tout d'abord cloner le projet :

```shell
git clone https://github.com/mhwalid/nodeIWM1.git
```

Se positionner dans le projet NodeJS :

```
cd '.\Rendu TP\'
```

Installer les dépendances :

```
npm install
```

Créer et Configurer le fichier d'environnement :

```
# .env

PORT=3000
LOGIN=
PASSWORD=
DB_NAME= 
DB_URL=
TOKEN_SECRET="GgdIFUYGIDUFGDIM1ZGYID1" # Pas le vraie token
```

Lancer le projet :

```
npm run dev
```

Tester les requêtes via la collection Postman créée :

## 5 grands principes REST :

- Uniforme : Les verbes HTTP comme identifiant des opérations, il ne faut donc pas faire un */api/human/create* mais un POST */api/human/* . Il faut également que chaque ressource dans le système soit accessible via une URL unique. Liste des verbes :

    - Créer (create) => **POST**
    - Afficher (read) => **GET**
    - Mettre à jour (update) => **PUT**
    - Supprimer (delete) => **DELETE**
    - Modification partiel => **PATCH**
    - Vérifier l'existence d'une ressource sans avoir la réponse => **HEAD**
    - **OPTIONS**
    - **TRACE**
    - **CONNECT**

- Stateless : Chaque requête envoyée au serveur doit contenir toutes les informations nécessaires pour comprendre et traiter cette requête

- Architecture Client-Server : Client et le serveur sont séparés et communiquent entre eux via des requêtes HTTP standard. Le client est responsable de l'interface utilisateur et de la logique côté client, tandis que le serveur gère le stockage et la logique côté serveur.

- Mise en cache : Utilisation d'un cache pour les performances :

    - Exemple :

      ```tsx
      if (token) {
              res.cookie('jwt', token, {httpOnly: true, maxAge});
          }
      ```

      Dans l'authentification on stocke notre token dans les cookies avec un temps d'expiration ce qui permet de ne pas rappeler notre méthode à chaque opération.

- Système de couches : Permet d'avoir une hiérarchie et d'équilibrer les ressources allouées aux différents systèmes. (Dans notre cas notre middleware est un bon exemple, il nous permet de gérer la sécurité du site)

## Fonctionnalités

- API RESTFUL
- Architecture inspirée du pattern MVC (contrôleurs / modèles / services)
- Tests unitaires (Uniquement sur le CRUD Animal)
- Contrôle des données issues de formulaires avec express et les schémas de validation Joi et Mongosse
- Gestion des erreurs et des types de retours dans les contrôleurs + système de log avec winston
- Utilisation de Type script
- Utilisation de la syntaxe ESM
- Utilisation du router Express pour la gestion des routes
- Système d'authentification avec JWT et protection des routes avec un middleware
- Connexion MongoDB et utilisation de mongoose pour interagir avec
- CRUD :
    - Animal (GET / POST / PUT / DELETE)
    - Human (GET / POST / PUT / DELETE) (En sachant qu'un humain peut avoir des animaux)
    - Méthode pour supprimer tous les animaux de tous les humains
    - Méthodes pour récupérer des humains qui ont des particularités (Plus de détail dans la description des routes)

## Routes

Authentification **/api/auth** :

- POST /register
- POST /login
- POST /logout
- GET /whoami : Récupère les informations de l'utilisateur connecté

Human **/api/human** :

- POST / : Vérifie avant l'ajout que si un animal est renseigné il existe bien. Si oui passe le boolean de l'animal isDomestic à true

- GET /

- GET /high : Récupération des humains ayant un salaire supérieur à 3000 et un âge inférieur à 20 ans

  GET /specific : Récupère les humains qui ont des salaires inférieurs à 1000 **ET** qui ont plus de 40 ans **ET** qui habitent à Paris **ET** un animal qui fait exactement 2 fois moins l'âge de l'humain

- GET /:id

- PUT /:id

- DELETE /:id

Animal **/api/animal** :

- POST /
- GET /
- GET /release : Enlève tout les animaux des humains et passe tous les animaux en isDomestic: false
- GET /:id
- PUT /:id
- DELETE /:id

## Bonus

Nous avons également fais les exercices MongoDB, vous pouvez les retrouver ici : https://github.com/mhwalid/nodeIWM1/tree/main/MongoDb%20Exercices



