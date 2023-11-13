// array query operator
// db.test.find({interests: ['Reading','Cooking']}).project({interests: 1}) // output: blank
// useing array query operator ( $all )
// db.test.find({interests: {$all: ['Reading','Cooking']}}).project({interests: 1})

// useing array Query Operator: ( $elemMatch )
// This operator you can use for access array field in get specified values
db.test.find({
    skills: {$elemMatch: {name: "JAVASCRIPT", level: "Expert"}},
    'interests.2': 'Cooking'
    }).projection({skills: 1, interests: 1})


