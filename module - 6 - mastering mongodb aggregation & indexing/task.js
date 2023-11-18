// Q - 1
// Retrieve the count of individuals who are active (isActive: true) for each gender.
// db.massiveData.aggregate([
//     // stage - 1
//     {
//         $match: {
//             isActive: true
//         }
//     },
//     // stage - 2
//     {
//         $group: { _id: "$gender",count: {$sum: 1}}
//     }

// ])

// Q - 2
// Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana."
// db.massiveData.aggregate([
//     // stage -1 
//     {
//         $match: {
//             isActive: true,
//             name: 'Murphy Cohen',
//             email: 'murphycohen@globoil.com',
//             favoriteFruit: 'banana'
//         }
//     }
// ])

// Q - 3
// Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.
// db.massiveData.aggregate([
//   // stage - 1
//   {
//       $group: {_id: '$favoriteFruit',avgAge: {$avg: '$age'}}
//   },
//   // stage - 2
//   {
//       $project: {
//           _id: 1,
//           avarageAge: {$floor: '$avgAge'}
//       }
//   }
// ])

// Q - 4
// Retrieve a list of unique friend names for individuals who have at least one friend, and include only the friends with names starting with the letter "W."
// db.massiveData.aggregate([
//     // stage - 1
//     {
//         $match: {
//             friends: {$exists: true,$ne: []}
//         }
//     },
//     // stage - 2
//     {
//         $unwind: '$friends'
//     },
//     // stage - 3
//     {
//         $match: {
//             'friends.name' :  /^W/
//         }
//     },
//     // stage - 4
//     {
//         $group: { _id: "$friends.name"}
//     }
// ])

// Q - 5
// Use $facet to separate individuals into two facets based on their age: those below 30 and those above 30. 
// Then, within each facet, bucket the individuals into age ranges (e.g., 20-25, 26-30, etc.) and sort them by name within each bucket.

// db.massiveData.aggregate([
//     // stage - 1
//     {
//         $facet: {
//             // pipeline - 1
//             ageOfThirtyBelow: [
//                 //stage - 1
//                 {
//                     $match: {
//                         age: { $lte: 30 }
//                     }
//                 },
//                 // stage - 2
//                 {
//                     $project: {
//                         age: 1,
//                         name: 1
//                     }
//                 },
//                 // stage - 3
//                 {
//                     $sort: { name: 1 }
//                 },
//                 // stage - 4
//                 {
//                     $bucket: {
//                         groupBy: "$age",
//                         boundaries: [20,25,30]
//                         default: "Other",
//                         output: {
//                             count: {$sum: 1}
//                             person: {$push: '$$ROOT'}
//                         }
//                     }
//                 }
//             ],
//             // pipeline - 2
//             ageOfThirtyAbove: [
//                 //stage - 1
//                 {
//                     $match: {
//                         age: { $gte: 30 }
//                     }
//                 },
//                 // stage - 2
//                 {
//                     $project: {
//                         age: 1,
//                         name: 1
//                     }
//                 },
//                 // stage - 3
//                 {
//                     $sort: { name: 1 }
//                 },
//                 // stage - 4
//                 {
//                     $bucket: {
//                         groupBy: "$age",
//                         boundaries: [40,50,60]
//                         default: "Other",
//                         output: {
//                             count: {$sum: 1},
//                             person: {$push: '$$ROOT'}
//                         }
//                     }
//                 },

//             ]
//         }
//     }
// ])

// Q - 6
// Calculate the total balance of individuals for each company and display the company name along with the total balance. 
// limit the result to show only the top two companies with the highest total balance.
db.massiveData.aggregate([
    // stage - 2
    {
        $group: {
            _id: "$company", totalBalance: {
                $sum: {
                    $function: {
                        body: function(balance) {
                            const value = balance.split('$')[1].split(',').join('')
                            return parseFloat(value)
                        },
                        args: ["$balance"],
                        lang: "js"
                    }
                }
            }
        }
    },
    // stage - 3
    {
        $sort: {
            totalBalance: -1
        }
    },
    // stage -5
    {
        $limit: 2
    }
])





















