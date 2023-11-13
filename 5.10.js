// use dolor $(update) operator
// this operator are updating array first field work with with $set operator
// db.test.updateOne({_id: ObjectId("6406ad63fc13ae5a40000065"), 'skills.name': 'JAVASCRIPT'}, {
//     $set: {
//         'skills.$.name' : 'PYTHON'
//     }
// })


// $inc operator:
db.test.updateOne({ _id: ObjectId("6406ad63fc13ae5a40000065")}, {
    $inc: {
        age: 3 // add to 2 years with existing age fielda
    }
})