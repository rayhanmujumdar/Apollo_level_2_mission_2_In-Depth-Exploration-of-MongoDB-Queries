# 5.2 - insertone,insermany find ,findOne, field filtering,project

**Date : 11/11/23**

1. [Insertone](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/) → if you can create a new data or insert new data  in collection then use this function
    1. **Behaviors:**
        1. Given an Object of documents,[`insertMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany)inserts a single of data into the collection
    2. ****`_id` Field**
        1. If the document does not specify an [`_id`](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id) field, then [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) will add the `_id` field and assign a unique [`ObjectId()`](https://www.mongodb.com/docs/manual/reference/method/ObjectId/#mongodb-method-ObjectId) for the document before inserting. Most drivers create an ObjectId and insert the `_id` field, but the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) will create and populate the `_id` if the driver or application does not.
    3. syntax example:
    
    ```jsx
    // request
    db.collection.insertOne(
        { item: "card", qty: 15 }, // your data
    		{
          writeConcern: <document> // optionals
        }
    )
    
    // response
    {
       "acknowledged" : true,
       "insertedId" : ObjectId("56fc40f9d735c28df206d078")
    }
    ```
    
2. [insertmany](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/) →  this function using to set many data inside the collection.
    1. Behaviors:
        1. Given an array of documents,`[insertMany()](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany)`inserts each document in the array into the collection.
    2. _id **Field**
        1. If the document does not specify an [`_id`](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id) field, then [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) adds the `_id` field and assign a unique [`ObjectId()`](https://www.mongodb.com/docs/manual/reference/method/ObjectId/#mongodb-method-ObjectId) for the document. Most drivers create an ObjectId and insert the `_id` field, but the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) will create and populate the `_id` if the driver or application does not.
    3. syntax example:
    
    ```jsx
    db.collection.insertMany([{name: 'Rayhan',age: 23}, {name: 'Siyam' , age: 24}])
    ```
    
3. [find](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/) → find a lots of data in collection if you don’t specify.  you can filtering with data field using this method 
    1. find method given three parameter.
        1. Query
        2. filter
        3. options
    2. Syntax example:
        
        ```jsx
        db.collection.find( <query>, <filter>, <options> )
        db.collection.find( <query>, <filter>, <options> ).project(<filter>) // you can chining with find method
        ```
        
    3. $**`Projection`**$
        1. The `projection` parameter determines which fields are returned in the matching documents. The `projection` parameter takes a document of the following form:
            
            ```jsx
            { <field1>: <value>, <field2>: <value> ... }
            ```
            
4. [findOne](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/) → returns one document that satisfies the specified query on the collection
    1. this method given three parameter
        1. query
        2. Projection ⬆️
        3. options
    2. **Behavior:**
        1. The `projection` parameter determines which fields are returned in the matching documents. The `projection` parameter takes a document of the following form:
            
            ```jsx
            { field1: <value>, field2: <value> ... }
            ```
            
        
    3. Syntax example:
        
        ```jsx
        db.collection.findOne( <query>, <projection>, <options> )
        ```
        

## Reference:

1. Mongodb shells (mongosh) collection methods docs:[Collection Methods](https://www.mongodb.com/docs/manual/reference/method/js-collection/)

# 5.3 | 5.4 - ****Comparison operator :(****$eq, $neq, $gt, $lt, $gte, $lte, $in, $nin)

**Date : 11/11/23**

1. Syntax example of operators:
    
    ```jsx
    // db.test.findOne(<filter field>: {opreator : value})
    db.test.findOne({gender: {$eq: 'Male'})
    db.test.find({isMarried: {$nq: true}})
    ```
    
2. ****Comparison****
    
    > For comparison of different BSON type values, see the [specified BSON comparison order.](https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/#std-label-bson-types-comparison-order)
    > 
    
    | Name | Description |
    | --- | --- |
    | [$eq](https://www.mongodb.com/docs/manual/reference/operator/query/eq/#mongodb-query-op.-eq) | Matches values that are equal to a specified value. |
    | [$gt](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) | Matches values that are greater than a specified value. |
    | [$gte](https://www.mongodb.com/docs/manual/reference/operator/query/gte/#mongodb-query-op.-gte )| Matches values that are greater than or equal to a specified value. |
    | [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in) | Matches any of the values specified in an array. |
    | [$lt](https://www.mongodb.com/docs/manual/reference/operator/query/lt/#mongodb-query-op.-lt) | Matches values that are less than a specified value. |
    | [$lte](https://www.mongodb.com/docs/manual/reference/operator/query/lte/#mongodb-query-op.-lte) | Matches values that are less than or equal to a specified value. |
    | [$ne](https://www.mongodb.com/docs/manual/reference/operator/query/ne/#mongodb-query-op.-ne) | Matches all values that are not equal to a specified value. |
    | [$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin) | Matches none of the values specified in an array. |
3. [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/) or [$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/)
    1. $in → The $in operator selects the documents where the value of a field equals any value in the specified array.
    2. $nin → [nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin) selects the documents where:
    • the specified field value is not in the specified array **or**
    • the specified field does not exist.
    3. code example:
    
    ```jsx
    db.test.find(
        {
            gender: 'Female',
            age: { $in: [18, 24, 25, 30, 50] }, // $in alternative $nin
            interests: {$in: ['Cooking', "Gaming"]}
            
        },
        { age: 1, gender: 1 ,interests: 1})
        .sort({ age: 1, gender: 1 })
    // implicit and
    ```
    

## Reference:

1. MongoDB **Query and Projection Operators**:[Query and Projection Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)


# 5.5 - Logical operator: $and, $or, implicit vs explicit

**Date: 12/11/23**

1. $and , $or are explicit
    
    
    | Name | Description |
    | --- | --- |
    | [$and](https://www.mongodb.com/docs/manual/reference/operator/query/and/#mongodb-query-op.-and) | Joins query clauses with a logical AND returns all documents that match the conditions of both clauses. |
    | [$not](https://www.mongodb.com/docs/manual/reference/operator/query/not/#mongodb-query-op.-not) | Inverts the effect of a query expression and returns documents that do not match the query expression. |
    | [$nor](https://www.mongodb.com/docs/manual/reference/operator/query/nor/#mongodb-query-op.-nor) | Joins query clauses with a logical NOR returns all documents that fail to match both clauses. |
    | [$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/#mongodb-query-op.-or) | Joins query clauses with a logical OR returns all documents that match the conditions of either clause. |

## Reference:

1. logical operator docs from mongodb[Logical Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)


# 5.6 - Element Query operator ($exists, $type,$size)

1. $exist and $type  operators are Element of Query operators
2. $size is a Array query operators
    
    
    | Name | Description |
    | --- | --- |
    | [$exists](https://www.mongodb.com/docs/manual/reference/operator/query/exists/#mongodb-query-op.-exists) | Matches documents that have the specified field/property. |
    | [$type](https://www.mongodb.com/docs/manual/reference/operator/query/type/#mongodb-query-op.-type) | Selects documents if a field/property is of the specified type. |
    | [$size](https://www.mongodb.com/docs/manual/reference/operator/query/size/#mongodb-query-op.-size) | Selects documents if the array field/property is a specified size |
3. Example:
    
    ```jsx
    // Element Query $exists operator example:
    // syntax -> db.test.find({<field>: boolean})
    // db.test.find({'address.postalCode' : {$exists: true}).project('address,age')
    
    // Element Query $type operator example:
    // db.test.find({age : {$type: "string"}).project('address,age')
    
    // Array Query $size operation
    // db.test.find({friends: {$size: 4}}).project('address,age,friends')
    ```
    

### Reference:

1. **BSON Types docs**
    
    [BSON Types](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-bson-types)


# 5.7 - Array Query operator - (**$all , $elemMatch)**

**Date : 12/11/23**

### **Table of Array Query Operator:**

| Name | Description |
| --- | --- |
| [`$all`](https://www.mongodb.com/docs/manual/reference/operator/query/all/#mongodb-query-op.-all) | Matches arrays that contain all elements specified in the query. |
| [`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch) | Selects documents if element in the array field matches all the specified [`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch) conditions. |

**Agenda:**

1. $all  → The`$all`operator selects the documents where the value of a field is an array that contains all the specified elements.
    1. syntax of $all operator
        
        ```jsx
        { <field>: { $all: [ <value1> , <value2> ... ] } }
        ```
        
2. $elemMatch → The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.
    1. syntax of  $elemMatch operator
        
        ```jsx
        { <field>: { $elemMatch: { <query1>, <query2>, ... } } }
        ```
        
3. practice example:
    
    ```jsx
    // array query operator
    // db.test.find({interests: ['Reading','Cooking']}).project({interests: 1}) // output: blank
    // useing array query operator ( $all )
    // db.test.find({interests: {$all: ['Reading','Cooking']}}).project({interests: 1})
    
    // useing array Query Operator: ( $elemMatch )
    // This operator you can use for access array field in get specified values
    db.test.find({
        skills: {$elemMatch: {name: "JAVASCRIPT", level: "Expert"}},
        'interests.2': 'Cooking' // array element access like -> interest.2
        }).projection({skills: 1, interests: 1})
    ```
    

## Reference:

1. Array Query Operators docs:[Array Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query-array/)


# 5.8 - Update Operators - (**$set, $addToSet, $push)**

**Date: 12/11/23**

**Agenda:**

### update operators with field update and array update:

1. The following modifiers are available for use in update operations, for example, in [`db.collection.updateMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany) and [`db.collection.findAndModify()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify)
2. `$set` → The [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) operator replaces the value of a field with the specified value.
    1. syntax:
        
        ```jsx
        { $set: { <field1>: <value1>, ... } }
        ```
        
3. `$addToSet` → The [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) operator adds a value to an array unless the value is already present, in which case [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) does nothing to that array.
    1. syntax:
        
        ```jsx
        { $addToSet: { <field1>: <value1>, ... } }
        ```
        
    2. **`$each`**The [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) modifier is available for use with the [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) operator and the [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) operator.
    Use with the [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) operator to add multiple values to an array `<field>` if the values do not exist in the `<field>`.
    3. syntax:
        
        ```jsx
        { $addToSet: { <field>: { $each: [ <value1>, <value2> ... ] } } }
        ```
        
4. in this case you can use $each operator $push operator → The [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) operator appends a specified value to an array .does nothing to that array.
    1. syntax:
        
        ```jsx
        { $push: { <field1>: <value1>, ... } }
        ```
        
    2. Use with the [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) operator to append multiple values to an array `<field>` using $each.
        1. syntax:
            
            ```jsx
            { $push: { <field>: { $each: [ <value1>, <value2> ... ] } } }
            ```
            
5. practicing example:
    
    ```jsx
    // using the $set operator to update my data
    // $set is not sweet able to non primitive data.
    // db.test.updateOne({
    //     _id:ObjectId('6406ad63fc13ae5a40000065')
    // },{$set:{
    //     age: 24,
    //     friends: ['Rahat', 'iqbal', 'shadat'] // array field in my database collection
    // }})
    
    // you can use $addToSet operator to update non primitive data
    // db.test.updateOne({
    //   _id:ObjectId('6406ad63fc13ae5a40000065')  
    // },{$addToSet: {
    // if you can do multiple data insert in array you can use $each operator
    //     friends: {$each: ['moshfiqe', 'Tamim']}
    // })
    
    // $addToSet operator does not set duplicate value in array
    // so this problem sloved by $push operator. you can use $push operator for adding multiple duplicate value in array
    db.test.updateOne({
        _id: ObjectId('6406ad63fc13ae5a40000065')
    }, {
        $push: {
            friends: 'shadat',
            skills: {
                $each: [
                    {
                        "name": "JAVASCRIPT",
                        "level": "Expert",
                        "isLearning": false
                    },
                    {
                        "name": "C#",
                        "level": "Expert",
                        "isLearning": true
                    },
                ]
            }
        }
    })
    ```
    

## Reference:

1. Mongodb update operators list:[Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/)



# 5.9 - Field Update | Array Update Operator : (**$unset, $pop, $pull, $pullAll)**

**Date : 12/11/23**

| name | description |
| --- | --- |
| [$unset](https://www.mongodb.com/docs/manual/reference/operator/update/unset/#mongodb-update-up.-unset) | Removes the specified field from a document. |
| [$pop](https://www.mongodb.com/docs/manual/reference/operator/update/pop/#mongodb-update-up.-pop) | Removes the first or last item of an array. |
| [$pull](https://www.mongodb.com/docs/manual/reference/operator/update/pull/#mongodb-update-up.-pull) | Removes all array elements that match a specified query. |
| [$pullAll](https://www.mongodb.com/docs/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll) | Removes all matching values from an array. |
1. `$unset` → The [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/update/unset/#mongodb-update-up.-unset) operator deletes a particular field.
    1. Consider the following syntax:
        
        ```jsx
        { $unset: { <field1>: "", ... } }
        ```
        
    2. Practice with shell example:
        
        ```jsx
        // $unset
        db.test.updateOne({
            _id: ObjectId("6406ad63fc13ae5a40000065")
        },{$unset:{
            'name.firstName' : 'Rayhan',
        }})
        ```
        
2. `$pop` → The [`$pop`](https://www.mongodb.com/docs/manual/reference/operator/update/pop/#mongodb-update-up.-pop) operator removes the first or last element of an array. Pass [`$pop`](https://www.mongodb.com/docs/manual/reference/operator/update/pop/#mongodb-update-up.-pop) a value of
    
    to remove the first element of an array and
    
    ```
    -1
    ```
    
    to remove the last element in an array.
    
    ```
    1
    ```
    
    ************Syntax:************
    
    ```jsx
    { $pop: { <field>: <-1 | 1>, ... } }
    ```
    
    - Practice with shell command:
    
    ```jsx
    // $pop example:
    // $pop property can you help for array of data. you can use the operator remove array first element
    // 1 = remove array last element
    // -1 = remove array fast element
    db.test.updateOne({
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },{$pop: {
        friends: -1 // fast element remove
    }})
    ```
    
3. `$pul` → The [`$pull`](https://www.mongodb.com/docs/manual/reference/operator/update/pull/#mongodb-update-up.-pull)`operator removes from an existing array all instances of a value or values that match a specified condition.
    1. The $pull operator has the following Syntax 
    
    ```jsx
    { $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
    ```
    
4. `$pullAll` → The [`$pullAll`](https://www.mongodb.com/docs/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll) operator removes all instances of the specified values from an existing array. Unlike the [`$pull`](https://www.mongodb.com/docs/manual/reference/operator/update/pull/#mongodb-update-up.-pull) operator that removes elements by specifying a query, [`$pullAll`](https://www.mongodb.com/docs/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll) removes elements that match the listed values.
    1. The $pullAll operator has the form:
        
        ```jsx
        { $pullAll: { <field1>: [ <value1>, <value2> ... ], ... } }
        ```
        

## Reference:

1. update operators lists:[Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/)

# 5-10 - More about $set, how to explore documentation with ($,$inc)

Date: 13/11/23

1. `$` → The positional [`$`](https://www.mongodb.com/docs/manual/reference/operator/update/positional/#mongodb-update-up.-) operator identifies an element in an array to update without explicitly specifying the position of the element in the array.
    1. Syntax:
        
        ```jsx
        { "<array>.$" : value }
        ```
        
    2. example:
        
        ```jsx
        db.collection.updateOne(
           { <array>: value ... },
           { <update operator>: { "<array>.$" : value } }
        )
        ```
        
    3. practice example:
        
        ```jsx
        // use dolor $(update) operator
        // this operator are updating array first field work with with $set operator
        db.test.updateOne({_id: ObjectId("6406ad63fc13ae5a40000065"), 'skills.name': 'JAVASCRIPT'}, {
            $set: {
                'skills.$.name' : 'PYTHON'
            }
        })
        ```
        
2. `$inc` → The [`$inc`](https://www.mongodb.com/docs/manual/reference/operator/update/inc/#mongodb-update-up.-inc) operator increments a field by a specified value.
    1. Behavior
        - The`$inc`operator accepts positive and negative values.
        - If the field does not exist,`$inc`creates the field and sets the field to the specified value.
        - Use of the`$inc`operator on a field with a null value will generate an error.
    2. syntax:
        
        ```jsx
        { $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
        ```
        
    3. Practice example:
        
        ```jsx
        // $inc operator:
        db.test.updateOne(
        {_id: ObjectId("6406ad63fc13ae5a40000065"},
        {
        	$inc:{
            age: 3 // add to 2 years with existing age field
        	}
        })
        ```
        

### Reference:

1. mogodb dolor $(update) docs with $set operator:
    
    [$ (update)](https://www.mongodb.com/docs/manual/reference/operator/update/positional/)
    
2. Mongodb Field update operator $inc  docs:
    
    [$inc](https://www.mongodb.com/docs/manual/reference/operator/update/inc/)


# 5.11 - ****delete documents, drop collection and how to explore by yourself****

**Date: 13/11/23**

1. [deleteOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/) → Removes a single document from a collection.
    1. syntax:
        
        ```jsx
        db.collection.deleteOne(
            <filter>,
            {
              writeConcern: <document>,
              collation: <document>,
              hint: <document|string>        // Available starting in MongoDB 4.4
            }
        )
        ```
        
2. [deleteMany()](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/) → Removes all documents that match the `filter` from a collection.
    1. syntax:
        
        ```jsx
        db.collection.deleteMany(
           <filter>,
           {
              writeConcern: <document>,
              collation: <document>
           }
        )
        ```
        
3. drop() → Removes a collection or [view](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page) from the database. The method also removes any indexes associated with the dropped collection. The method provides a wrapper around the `[drop](https://www.mongodb.com/docs/manual/reference/command/drop/#mongodb-dbcommand-dbcmd.drop)` command.
    1. syntax:
        
        ```jsx
        db.collection.drop( { writeConcern: <document> } )
        ```
        
    2. example:
        
        ```jsx
        db.students.drop( { writeConcern: { w: 1 } } )
        ```
        

## Reference:

1. mongodb collection delete docs:[db.collection.drop()](https://www.mongodb.com/docs/manual/reference/method/db.collection.drop/)


# 5.12 - Practice task

**Date : 13/11/23**

**Practice Task: In-Depth Exploration of MongoDB Queries**

1. ****Find all documents in the collection where the age is greater than 30, and only return the name and email fields.
2. Find documents where the favorite color is either "Maroon" or "Blue."
3. Find all documents where the skills is an empty array.
4. Find documents where the person has skills in both "JavaScript" and "Java."
5. Add a new skill to the skills array for the document with the email "aminextleveldeveloper@gmail.com" The skill is {"name": "Python", "level": "Beginner", "isLearning": true}.
6. Add a new language "Spanish" to the list of languages spoken by the person.
7. Remove the skill with the name "Kotlin" from the skills array.

**Practice Task solving:**
```js
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
```