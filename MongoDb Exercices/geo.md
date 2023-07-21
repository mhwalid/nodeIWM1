Exercice 1

Vous disposez du code JavaScript suivant qui comporte une fonction de conversion d’une distance exprimée en kilomètres vers des radians ainsi que d’un document dont les coordonnées serviront de centre à notre sphère de recherche. Écrivez la requête $geoWithin qui affichera le nom des salles situées dans un rayon de 60 kilomètres et qui programment du Blues et de la Soul.

```
var KilometresEnRadians = function(kilometres){ 
   var rayonTerrestreEnKm = 6371; 
   return kilometres / rayonTerrestreEnKm; 
}; 
 
var salle = db.salles.findOne({"adresse.ville": "Nîmes"}); 
 
var requete = {
  "adresse.localisation": {
    $geoWithin: {
      $centerSphere: [
        [salle.adresse.localisation.coordinates[0], salle.adresse.localisation.coordinates[1]],
        KilometresEnRadians(60)
      ]
    }
  },
  styles: { $all: ["blues", "soul"] }
};

db.salles.find(requete, { nom: 1 }); 
```


Exercice 2: 

Écrivez la requête qui permet d’obtenir la ville des salles situées dans un rayon de 100 kilomètres autour de Marseille, triées de la plus proche à la plus lointaine :

```
var marseille = {"type": "Point", "coordinates": [43.300000, 5.400000]} 
 
db.salles.find({
  "adresse.localisation": {
    $near: {
      $geometry: marseille,
      $maxDistance: KilometresEnRadians(100)
    }
  }
}, { "adresse.ville": 1 }).sort({ 
  "adresse.localisation": 1 
});
```


Exercice 3:

Soit polygone un objet GeoJSON de la forme suivante :

```
var polygone = { 
     "type": "Polygon", 
     "coordinates": [ 
            [ 
               [43.94899, 4.80908], 
               [43.95292, 4.80929], 
               [43.95174, 4.8056], 
               [43.94899, 4.80908] 
            ] 
     ] 
} 

db.salles.find({
  "adresse.localisation": {
    $geoWithin: {
      $geometry: polygone
    }
  }
}, { "nom": 1 });
```

Donnez le nom des salles qui résident à l’intérieur.

