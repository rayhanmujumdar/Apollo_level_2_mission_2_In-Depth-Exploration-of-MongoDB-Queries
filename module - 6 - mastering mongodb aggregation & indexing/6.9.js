// This query search using COLLSCAN. this query searching algorithm is very slow for large scale data.
// db.massiveData.find({email: 'boylemack@comveyor.com'}).explain('executionStats') // now query time is 8ms
// db.massiveData.createIndex({"eamil": 1}) // create a indexes with email
db.massiveData.find({email: 'boylemack@comveyor.com'}).explain() // now queye time is 0ms because now email is indexed

// you can delete your indexes field
// db.massiveData.dropIndex({email: 1})