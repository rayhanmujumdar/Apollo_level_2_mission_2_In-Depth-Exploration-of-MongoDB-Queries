// better performance to using indexing
// db.massiveData.find({gender: 'male', age: 21}) // query time is 10ms
// db.massiveData.createIndex({gender: -1, age: 1}) // create a index with gender or age field

// db.massiveData.createIndex({about: 'text'})
db.massiveData.find({$text: { $search: "dolor" }})