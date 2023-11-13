// using the $set operator to update my data
// $set is not sweet able to non primitive data.
// db.test.updateOne({
//     _id:ObjectId('6406ad63fc13ae5a40000065')
// },{$set:{
//     age: 24,
//     friends: ['Rahat', 'iqbal', 'shadat'] // array field in my database collection
// }})

// you can use $addToSet operator to update non primitive data
// db.test.updateOne({
//   _id:ObjectId('6406ad63fc13ae5a40000065')  
// },{$addToSet: {
 // if you can do multiple data insert in array you can use $each operator
//     friends: {$each: ['moshfiqe', 'Tamim']}
// })


// $addToSet operator does not set duplicate value in array
// so this problem sloved by $push operator. you can use $push operator for adding multiple duplicate value in array
db.test.updateOne({
    _id: ObjectId('6406ad63fc13ae5a40000065')
}, {
    $push: {
        friends: 'shadat',
        skills: {
            $each: [
                {
                    "name": "JAVASCRIPT",
                    "level": "Expert",
                    "isLearning": false
                },
                {
                    "name": "C#",
                    "level": "Expert",
                    "isLearning": true
                },
            ]
        }
    }
})