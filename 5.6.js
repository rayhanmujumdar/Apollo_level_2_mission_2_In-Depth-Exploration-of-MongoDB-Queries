// Element Query $exists operator example:
// syntax -> db.test.find({<field>: boolean})
// db.test.find({'address.postalCode' : {$exists: true}).project('address,age')

//Element Query $type operator example:
// db.test.find({age : {$type: "string"}).project('address,age')

// Array Query $size operation
db.test.find({friends: {$size: 4}}).project('address,age,friends')


