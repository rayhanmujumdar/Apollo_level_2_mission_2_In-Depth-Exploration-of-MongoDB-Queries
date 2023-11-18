db.test.aggregate([
    // stage - 1
    {
          $unwind: {
              path: '$interests'
          }
    },
    // stage - 2
    {
        $group: { _id: "$age", totalPerson: {$sum: 1}, interested: {$push: '$interests'}}
    }
    // stage - 3
])