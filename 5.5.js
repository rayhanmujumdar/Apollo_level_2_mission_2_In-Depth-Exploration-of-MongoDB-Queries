// using explicit AND operator
// db.test
//   .find({
//     $and: [
//       { age: { $lte: 30, $gte: 20 } },
//       {
//         "address.city": {
//           $nin: ["Dongxi"],
//         },
//       },
//     ],
//   })
//   .project({ age: 1, address: 1 })
//   .sort({ age: 1 });

// explicit OR operator
// db.test
//   .find({ $or: [{ age: { $lt: 30, $gt: 20 } }, { gender: "female" }] })
//   .project({ gender: 1, age: 1 })
//   .sort({ gender: "desc" });

// usign $not operator
// $not operator does work similar like javascript (!) logical not operator
// db.test.find({age: {$not: {$lte: 20}}}).project({age: 1,gender: 1,name: 1}).sort({age: -1}).limit(20)

// using $nor operator
// its almost similar to $not. $nor is expicit but $not is implicit ,or $nor get array of multi condition , that's the different.
db.test.find({$nor: [{age: {$gte: 20}}, {gender: 'Female'}]).project({age: 1,gender: 1,name: 1}).sort({age: -1}).limit(20)
