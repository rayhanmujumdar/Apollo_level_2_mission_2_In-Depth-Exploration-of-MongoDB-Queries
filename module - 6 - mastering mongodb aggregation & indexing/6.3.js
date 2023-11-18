db.test.aggregate([
    // stage - 1
    // $group
    {
        $group: { _id: "$address.country" , count: { $sum: 1} , liveInCountryPerson: {$push:'$$ROOT'} }
    },
    // stage - 2
    // $project
    {
        $project: {
            'liveInCountryPerson.name' : 1,
            'liveInCountryPerson.email' : 1,
            'liveInCountryPerson.phone' : 1,
            count: 1
        }        
    }

])