# 5.2 - insertone,insermany find ,findOne, field filtering,project

**Date : 11/11/23**

1. [Insertone](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/) → if you can create a new data or insert new data  in collection then use this function
    1. **Behaviors:**
        1. Given an Object of documents,`[insertMany()](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany)`inserts a single of data into the collection
    2. ****`_id` Field**
        1. If the document does not specify an [_id](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id) field, then `[mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod)` will add the `_id` field and assign a unique `[ObjectId()](https://www.mongodb.com/docs/manual/reference/method/ObjectId/#mongodb-method-ObjectId)` for the document before inserting. Most drivers create an ObjectId and insert the `_id` field, but the `[mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod)` will create and populate the `_id` if the driver or application does not.
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
        1. If the document does not specify an [_id](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id) field, then `[mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod)` adds the `_id` field and assign a unique `[ObjectId()](https://www.mongodb.com/docs/manual/reference/method/ObjectId/#mongodb-method-ObjectId)` for the document. Most drivers create an ObjectId and insert the `_id` field, but the `[mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod)` will create and populate the `_id` if the driver or application does not.
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
    | https://www.mongodb.com/docs/manual/reference/operator/query/eq/#mongodb-query-op.-eq | Matches values that are equal to a specified value. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt | Matches values that are greater than a specified value. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/gte/#mongodb-query-op.-gte | Matches values that are greater than or equal to a specified value. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in | Matches any of the values specified in an array. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/lt/#mongodb-query-op.-lt | Matches values that are less than a specified value. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/lte/#mongodb-query-op.-lte | Matches values that are less than or equal to a specified value. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/ne/#mongodb-query-op.-ne | Matches all values that are not equal to a specified value. |
    | https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin | Matches none of the values specified in an array. |
3. [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/) or [$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/)
    1. $in → The $in operator selects the documents where the value of a field equals any value in the specified array.
    2. $nin → `[$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin)` selects the documents where:
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