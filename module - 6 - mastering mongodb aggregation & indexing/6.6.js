db.test.aggregate([
    // stage - 1
    {
        $bucket: {
            groupBy: '$age',
            boundaries: [20,40,60,80],
            default: 'moreOlder',
            output: {
                count: {$sum: 1},
                personName: {$push: '$name'}
            }
        }
    },
    // stage - 2
    {
        $sort: {count: -1}
    },
    // stage -3
    {
        $limit : 2
    },
])