Exercice 2

Écrivez le pipeline qui affichera dans un champ nommé apres_extension la capacité d’une salle augmentée de 100 places, dans un champ nommé avant_extension sa capacité originelle, ainsi que son nom.

```
db.salles.aggregate([
  {
    $addFields: {
      avant_extension: "$capacite",
      apres_extension: { $add: ["$capacite", 100] }
    }
  },
  {
    $project: {
      _id: 0,
      nom: 1, 
      avant_extension: 1,
      apres_extension: 1
    }
  }
])
```

Exercice 3

Écrivez le pipeline qui affichera, par numéro de département, la capacité totale des salles y résidant. Pour obtenir ce numéro, il vous faudra utiliser l’opérateur $substrBytes dont la syntaxe est la suivante :
```
db.salles.aggregate([
  {
    $group: {
      _id: { $substrBytes: ["$adresse.codePostal", 0, 2] },
      capacite_max: { $sum: "$capacite" }
    }
  },
  {
    $project: {
      _id: 0,
      departement: "$_id",
      capacite_max: 1
    }
  }
])
```
Exercice 4

Écrivez le pipeline qui affichera, pour chaque style musical, le nombre de salles le programmant. Ces styles seront classés par ordre alphabétique.

```
db.salles.aggregate([
  {
    $unwind: "$styles"
  },
  {
    $group: {
      _id: "$styles",
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      _id: 1
    }
  },
  {
    $project: {
      _id: 0,
      style: "$_id",
      nb_salles: "$count"
    }
  }
])
```

Exercice 5

À l’aide des buckets, comptez les salles en fonction de leur capacité :

celles de 100 à 500 places

celles de 500 à 5000 places

```
db.salles.aggregate([
  {
    $bucket: {
      groupBy: "$capacite",
      boundaries: [100, 500, 5000],
      default: "Autre",
      output: {
        nb_salles: { $sum: 1 }
      }
    }
  },
  {
    $project: {
      _id: 0,
      capacite: {
        $concat: [
          { $cond: [{ $eq: ["$_id", 100] }, "100 à 500 places", ""] },
          { $cond: [{ $eq: ["$_id", 500] }, "500 à 5000 places", ""] },
          { $cond: [{ $eq: ["$_id", "Autre"] }, "Autre", ""] }
        ]
      },
      nb_salles: 1
    }
  }
])
```

Exercice 6

Écrivez le pipeline qui affichera le nom des salles ainsi qu’un tableau nommé avis_excellents qui contiendra uniquement les avis dont la note est de 10.