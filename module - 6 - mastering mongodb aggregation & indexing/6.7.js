db.test.aggregate([
    // stage 1
    {
        $facet: {
            // pipeline - 1
            totalFriendsCount: [
                // stage - 1
                {
                    $unwind: "$friends"
                },
                // stage - 2
                {
                    $group: { _id: "$friends", count: { $sum: 1 } }
                }
            ]
            // pipeline - 2
            totalSkills: [
                // stage - 1
                {
                    $unwind: "$skills"
                },
                // stage - 2
                {
                    $group: { _id: "$skills", count: { $sum: 1 } }
                },
                // stage - 3
                {
                    $project: {
                        _id: 0,
                        skill: '$_id',
                        count: 1
                    }
                }
            ]
            // pipeline - 3
            totalDgree: [
                // stage - 1
                {
                    $unwind: "$education"
                },
                // stage - 2
                {
                    $group: { _id: "$education.degree", count: {$sum:  1}}
                }
            ]
        }
    },
])