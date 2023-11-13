// 1. Find all documents in the collection where the age is greater than 30, and only return the name and email fields.
db.test.find({
    age: {$gt : 30}
}).project('name,email')

// 2. Find documents where the favorite interests is either "Cooking" or "Reading"
db.test.find({$or: [{interests: 'Cooking'}, {interests: 'Writing'}]})
db.test.find({
    interests: {$in: ['Cooking',"Reading"]}
})
// 3. Find all documents where the skills is an empty array.
db.test.find({
    skills: {$size: 0}
})

// 4. Find documents where the person has skills in both "JavaScript" and "Java."
// example: 1
db.test.find({
    'skills.name': { $all: ['JAVASCRIPT', "JAVA"] }
})

// example: 2
db.test.find({
    $and: [
        {
            'skills.name' : 'JAVASCRIPT'
        },
        {
            'skills.name' : 'JAVA'
        },
    ]
})

// 5. Add a new skill to the skills array for the document with the email "amccurry3@cnet.com" The skill is {"name": "Python", "level": "Beginner", "isLearning": true}.
db.test.updateOne({email: "amccurry3@cnet.com"},{$addToSet:{
    skills: {"name": "Python", "level": "Beginner", "isLearning": true}
}})

// 6. Add a new language "Spanish" to the list of languages spoken by the person.
db.test.updateMany({},{$addToSet:{
    languages: 'Spanish'
}})

// 7. Remove the skill with the name "Kotlin" from the skills array.
db.test.updateMany({ 'skills.name': "KOTLIN" }, {
    $unset: {
        skills: { $elemMatch: { name: 'KOTLIN' } }
    }
})
