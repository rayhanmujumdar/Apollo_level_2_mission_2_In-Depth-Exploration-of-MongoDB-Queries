db.test.find(
    {
        age: { $in: [18, 24, 25, 30, 50] },
        gender: 'Female'
        
    },
    { age: 1, gender: 1 })
    .sort({ age: 1, gender: 1 })
// implicit and