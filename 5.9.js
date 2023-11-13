// $unset example:
// $unset remove field in your collection of document
// db.test.updateOne({
//     _id: ObjectId("6406ad63fc13ae5a40000065")
// },{$unset:{
//     'name.firstName' : 'Rayhan',
// }})


// $pop example:
// $pop property can you help for array of data. you can use the operator remove array first element
// 1 = remove array last element
// -1 = remove array fast element
// db.test.updateOne({
//     _id: ObjectId("6406ad63fc13ae5a40000065")
// },{$pop: {
//     friends: -1 // fast element remove
// }})

// $pull example:
// $pull kono ekta data ke pull kore niye ase and update kore dey
// db.test.updateOne({_id: ObjectId( "6406ad63fc13ae5a40000065"},{$pullAll:{
//     friends: 'Rahat'
// }})

// $pullAll
// $pullAll onek gula array element ke pull kore niye ase
db.test.updateOne({_id: ObjectId( "6406ad63fc13ae5a40000065")},{$pullAll:{
    friends: ['Rahat',"alamin", "sakib", "sabbir"]
}})
