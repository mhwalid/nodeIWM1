

Mongodb : SGDB nosql orienté document

NodeJS : Environnement exécution cotes serveurs qui permet exécuter du JS sur en dehors de son navigateur

Gestionnaire de package : npm / yarn / pnpm

node_module : répertoire de destination des packages

Express : framework web

BSON : Binary JSON c'est ce qui est stocké en BDD. Il permet d'avoir plus de types que JSON

Organisation de la BDD : 

( Ligne - Tuple (SQL) - **Document** (Mongo) ) = pareil 

Mongodb permet aux schémas d'être flexible et dynamique (Pas de schéma définis)

Node JS interagit avec Mongodb, Il faut donc un ODM (Objet document mapper) mongoss. Permet de manager les documents et collections à nos modèles JS, c'est grâce à ca qu'on va structurer notre BDD.



Le mieux est de séparer la configuration de la connexion à MongoDB et l'utilisation d'express : 

Dans un fichier db.config.ts : 

*// Chaine de connection à ATLAS, il faut ajouter les informations de connexions nécessaires. Ces informations peuvent provenenir d'un .env
**const* connectionString = `mongodb+srv://${username}:${password}@${url}/${dbName}?retryWrites=true&w=majority`

*// Connexion à MongoDB et gestion du retour
**// La méthode connect de l'ODM mongoose va initialiser la connexion grâce à la chaine créée en amont.
**export const* db = mongoose.*connect*(connectionString)
    .then(*res* => {
        *if*(*res*){
            console.log('Database connection successfully')
        }

​    }).catch(*err* => {
​        console.log('`Database connection error', *err*)
​    })

Une fois ce fichier créé, on peut recupérer notre constante de connexion db dans notre app.ts : 

// Récupération de notre constante db

*import* {db} *from* "db.config"

*import* *express* *from* 'express'

// Initialisation de notre application avec Express

*const* app = *express*()

// Une fois la connexion effectuée on lance notre serveur express

db.then(() => {
    app.listen(process.env.PORT, () => console.log('Server is listening on port 3000'))
})

