// $match (aggregation)
db.test.aggregate([
    // stage - 1
    // filtering the document with age grater then 20 or less then 50
    {
        $match: {
            age: { $gte: 20, $lte: 50 }
        }

    },
    // stage - 2
    {
        $project: {
            email : 1,
            phone : 1,
            totalEarning: {$multiply: [{$subtract: ['$age',18]}, 12, '$salary']}
        }
    }
])