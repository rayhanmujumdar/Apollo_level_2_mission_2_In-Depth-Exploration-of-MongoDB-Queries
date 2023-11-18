db.test.aggregate([
    // stage - 1 
    // $group
    {
        $group: { 
            _id: null, 
            totalDocs: {$count: {}},
            totalSalary: { $sum: '$salary' } ,
            maxSalary: {$max: "$salary"},
            minSalary: {$min: '$salary'},
            avgSalary: {$avg: "$salary"}
        }
    },
    // stage - 1
    {
        $project:{
            totalDocument: '$totalDocs',
            totalSalary: 1,
            maxSalary: 1,
            minSalary: 1,
            avargeSalary: {$round: ['$avgSalary', 2]}
        }
    }
])