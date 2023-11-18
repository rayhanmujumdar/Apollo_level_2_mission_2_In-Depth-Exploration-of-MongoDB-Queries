
db.test.aggregate([
    // stage - 1
    // match
    {
        $match: {
            age: {$gte: 20, $lte: 50},
            'education.year' : {$gte: 2000}
        }
    },
    // stage - 2
    // addToFields
    {
       $addFields: {
           birthYear: {$subtract: ['$age',2]},
           course: 'Programming hero',
           instructor: 'Rayhan Mojumdar'
       }
    },
    // stage - 3
    // project
    {
        $project: {
            name: 1,
            email: 1,
            age: 1,
            amarname: 1,
            education: 1,
            course: 1,
            instructor: 1
        }
    },
    // stage - 4
    // $out -> error: $out can only be the final stage in the pipeline
    // {
    //     $out: {db: 'practice', coll: 'test2'}
    // },
    // stage - 5
    // $merge -> error: $merge can only be the final stage in the pipeline
    {
        $merge: { into: { db: "practice", coll: "test2" },on: '_id', whenMatched: 'replace' , whenNotMatched: 'insert'}
    }
])