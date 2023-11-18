# 6.0 - Introduction of powerful aggregation framework

**Date: 13/11/23**

**Q&A:** 

1. What is Aggregation
    
    Ans: Aggregation is a way of processing a large number of documents in a collection by means of passing them through different stages.
    
    The stages make up what is known as a pipeline
    
    The Stages in a pipeline can filter, sort, group, reshape, and modify documents that pass through the pipeline.
    

# **Aggregation Pipelines**

An aggregation pipeline consists of one or more [stages](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference) that process documents:

- Each stage performs an operation on the input documents. For example, a stage can filter documents, group documents, and calculate values.
- The documents that are output from a stage are passed to the next stage.
- An aggregation pipeline can return results for groups of documents. For example, return the total, average, maximum, and minimum values.

************Aggregation Syntax:************

```jsx
db.collection.aggregation([
	// stage - 1
	{}, // ->  pipeline
	// stage - 2
	{}, // -> pipeline
	// stage - 3
	{} // -> pipeline
])
```

**Aggregation pipeline Visualize:**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6b556a7a-0921-47cb-9ba3-44bf140bacc2/245f3386-d20c-4196-ba1a-a135b0ad13f3/Untitled.png)

****Example:****

```jsx
db.cousins.aggregation([
	// filter out the cousins who have an exam
	{$match: {hasExam: {$ne: true}}},
	// filter out cousins who have a budget less then 500
	{$match: {budget: {$gte: 500}}}
	// filter out cousins who are sick
	{$match : {isSick: true}}
	// sort by age
	{$sort: {age: -1}} // descending
	// limit by 2
	{$limit: 2}
	// calculate the budget
	{
			$group: {
					_id: null
					totalBudget: {$sum: '$budget'}
					cousins: {$push: '$name'}
			}
	}
	
])
```
## Reference:

1. Mongodb Aggregation **definition:**
    
    [What Is Aggregation In MongoDB?](https://www.mongodb.com/basics/aggregation)
    
2. simple aggregation tutorial:
    
    [MongoDB - Aggregation](https://www.tutorialspoint.com/mongodb/mongodb_aggregation.htm)


# ****6.1 - $match , $project aggregation stage****

**Date: 14/11/23**

**Agenda:**

**MongoDB Aggregation:**

1. [$match](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/) → Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
    
    **The $match stage has the following prototype form:**
    
    ```jsx
    { $match: { <query> } }
    ```
    
    ****Behavior:****
    
    ****Pipeline Optimization****
    
    - Place the `$match` as early in the aggregation [pipeline](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-pipeline) as possible. Because `$match` limits the total number of documents in the aggregation pipeline, earlier `$match` operations minimize the amount of processing down the pipe.
    - If you place a `$match` at the very beginning of a pipeline, the query can take advantage of [indexes](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-index) like any other `db.collection.find()` or `db.collection.findOne()`[.](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/#mongodb-method-db.collection.findOne)
    
    > **[Restrictions](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/#restrictions): → click to see $match some Restrictions**
    > 
    
    ****Practice and Example:****
    
    ```jsx
    // $match (aggregation)
    db.test.aggregate([
        // stage - 1
        // filtering the document with age grater then 20 or less then 50
        {
            $match: {
                age: { $gte: 20, $lte: 50 },
                'address.country' : {$in: ['Armenia','China',"Portugal"]}
            }
    
        },
        // stage - 2
        // sorting by age
        {
            $sort: {
                age : -1
            }
        }
    ])
    ```
    
2. [$project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/) → Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be existing fields from the input documents or newly computed fields.
    
    **The`$project`stage has the following prototype form:**
    
    ```jsx
    { $project: { <specification(s)> } }
    ```
    
    **Some benefits of using $project include:**
    
    1. **Improved query performance**: By selecting only the required fields and excluding unnecessary data, $project can help reduce the amount of data that needs to be processed and transmitted over the network, resulting in faster queries.
    2. **Data normalization:** $project can be used to transform data into a format that is more suitable for analysis or reporting, such as converting dates to a standard format or grouping data by category.
    3. **Simplified data access:** $project can be used to create a simplified view of the data for applications that only need to access a subset of fields.
    
    ### **Restrictions:**
    
    - An error is returned if the `$project` specification is an empty document. You cannot use an array index with the `$project` stage. See Array Indexes are Unsupported.
    
    **if** **You need to know More about of $project aggregation pipeline please visit this docs: → Click [$project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project)** 
    
    ****************************#Practice and Example of $project:**
    
    ```jsx
    // $match (aggregation)
    db.test.aggregate([
        // stage - 1
        // filtering the document with age grater then 20 or less then 50
        {
            $match: {
                age: { $gte: 20, $lte: 50 }
            }
    
        },
        // stage - 2
        {
            $project: {
                email : 1,
                phone : 1,
                totalEarning: {$multiply: [{$subtract: ['$age',18]}, 12, '$salary']}
            }
        }
    ])
    ```
    

## Reference:

1. MongoDB $match aggregation pipeline docs:
    
    [$match (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
    
2. MongoDB $Project aggregation pipeline docs:
    
    [$project (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)

# 6.2 - $addToFields, $out, $merge aggregation stage

**Date: 15/11/23**

**Agenda :**

1. [$addToFields](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/addFields/) → The $addFields stage in the MongoDB aggregation pipeline is used to add new fields to documents. It allows you to create new fields or overwrite existing fields with new values. This stage is useful for performing calculations, data transformations, or adding metadata to documents.
    
    `**$addFields`has the following form:**
    
    ```jsx
    { $addFields: { <newField>: <expression>, ... } }
    ```
    
    ****Behavior:****
    
    - `$addFields` appends new fields to existing documents. You can include one or more `$addFields` stages in an aggregation operation.
    - To add field or fields to embedded documents (including documents in arrays) use the dot notation. See [example.](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/addFields/#std-label-add-field-to-embedded)
    - To add an element to an existing array field with [`$addFields`](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields), use with [`$concatArrays`](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/concatArrays/#mongodb-expression-exp.-concatArrays). See [example.](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/addFields/#std-label-addFields-add-element-to-array)
    
    **#Practice and Example :**
    
    ```jsx
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
               birthYear: {$subtract: ['$age',2]}
               amarname: 'Rayahn'
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
                birthYear: 1,
                totalDays: 1
            }
        }
    ])
    ```
    
2. [$out](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) → Takes the documents returned by the aggregation pipeline and writes them to a specified collection. Starting in MongoDB 4.4, you can specify the output database.
    
    The `$out` stage must be *the last stage* in the pipeline. The `$out` operator lets the aggregation framework return result sets of any size.
    
    **The`$out`stage has the following syntax:**
    
    ```jsx
    { $out: { db: "<output-db>", coll: "<output-collection>" } }
    ```
    
    **Behaviors:**
    
    ****$out Read Operations Run on Secondary Replica Set Members:****
    
    - Starting in MongoDB 5.0, `$out` can run on replica set secondary nodes if all the nodes in cluster have featureCompatibilityVersion set to `5.0` or higher and the Read Preference is set to secondary.
    - Read operations of the `$out` statement occur on the secondary nodes, while the write operations occur only on the primary nodes.
    - Not all driver versions support targeting of `$out` operations to replica set secondary nodes. Check your driver documentation to see when your driver added support for `$out` running on a secondary.
    
    ****Create New Collection****
    
    - The `$out` operation creates a new collection if one does not already exist.
    - The collection is not visible until the aggregation completes. If the aggregation fails, MongoDB does not create the collection.
    
    **Replace Existing Collection**
    
    If the collection specified by the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) operation already exists, then upon completion of the aggregation, the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) stage atomically replaces the existing collection with the new results collection. Specifically, the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out)` operation:
    
    1. Creates a temp collection.
    2. Copies the indexes from the existing collection to the temp collection.
    3. Inserts the documents into the temp collection.
    4. Calls the `renameCollection` command with `dropTarget: true` to rename the temp collection to the destination collection.
    
    The `$out` operation does not change any indexes that existed on the previous collection. If the aggregation fails, the `$out` operation makes no changes to the pre-existing collection.
    
    > More details to know about  $out ,to go out MongoDB aggregation documentation
    > 
3. [$merge](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) → Writes the results of the aggregation pipeline to a specified collection. The `$merge`operator must be the **last** stage in the pipeline.
    
    **Some Behaviors:**
    
    - Creates a new collection if the output collection does not already exist.
    - Can incorporate results (insert new documents, merge documents, replace documents, keep existing documents, fail the operation, process documents with a custom update pipeline) into an existing collection.
    - Can output to a sharded collection. Input collection can also be sharded.
    - **sharded means**: Sharding is a database partitioning technique that splits a large database into smaller, more manageable parts called shards. Each shard is stored on a separate server and can be accessed independently, allowing for improved scalability and performance.
    
    `**$merge`has the following syntax:**
    
    ```jsx
    { $merge: {
         into: <collection> -or- { db: <db>, coll: <collection> },
         on: <identifier field> -or- [ <identifier field1>, ...],  // Optional
         let: <variables>,                                         // Optional
         whenMatched: <replace|keepExisting|merge|fail|pipeline>,  // Optional
         whenNotMatched: <insert|discard|fail>                     // Optional
    } }
    ```
    
    **For example:**
    
    ```jsx
    { $merge: { into: "myOutput", on: "_id", whenMatched: "replace", whenNotMatched: "insert" } }
    ```
    
    If using all default options for`$merge`, including writing to a collection in the same database, you can use the simplified form:
    
    ```jsx
    { $merge: <collection> } // Output collection is in the same database
    ```
    
    > More details to know about  [$marge](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge) , to go out MongoDB aggregation documentation
    > 

## Reference:

1. MongoDB aggregation pipeline $addToFields stage docs:
    
    [$addFields (aggregation)](https://www.mongodb.com/docs/v5.3/reference/operator/aggregation/addFields/)
    
2. MongoDB aggregation pipeline $out stage docs:
    
    [$out (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out)

# 6.3 - **$group stage with using $sum , $push aggregation operators**

**Date : 15/11/23**

**Agenda:**

**[$group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/) :**

The `$group` stage separates documents into groups according to a "group key". The output is one document for each unique group key.

A group key is often a field, or group of fields. The group key can also be the result of an expression. Use the `_id` field in the `$group` pipeline stage to set the group key. See below for usage examples.

In the `$group` stage output, the `_id` field is set to the group key for that document.

The output documents can also contain additional fields that are set using

**The`$group`stage has the following prototype form:**

```jsx
{
 $group:
   {
     _id: <expression>, // Group key -> must be required
     <field1>: { <accumulator1> : <expression1> },
     ...
   }
 }
```

********************Example:********************

```jsx
db.universities.aggregate([
  { $group : { _id : '$name', totaldocs : { $sum : 1 } } }
]).pretty()
```

**Example:**

```jsx
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
```

**MongoDB $group aggregation operators:**

The $group stage supports certain expressions (operators) allowing users to perform arithmetic, array, boolean and other operations as part of the aggregation pipeline.

| Operator | Meaning |
| --- | --- |
| $count | Calculates the quantity of documents in the given group. |
| $max | Displays the maximum value of a document’s field in the collection. |
| $min | Displays the minimum value of a document’s field in the collection. |
| $avg | Displays the average value of a document’s field in the collection. |
| $sum | Sums up the specified values of all documents in the collection. |
| $push | Adds extra values into the array of the resulting document. |

## Reference:

1. MongoDB $group aggregation simple docs in studio3t:
    
    [MongoDB Aggregation: tutorial with examples and exercises | Studio 3T](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-group)
    
2. MongoDB $group aggregation main docs in MongoDB:
    
    [$group (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)

# **6.4 explore more about $group & $project**

**Date: 15/11/23**

**Agenda:**

1. More example in $group or $project aggregation stage, you can do it with $group or $project stage
    
    ```jsx
    // different us case of $group and $project
    db.test.aggregate([
        // stage - 1 
        // $group
        {
            $group: { 
                _id: null, // null value is created, all groups is one group
                totalDocs: {$count: {}}
                totalSalary: { $sum: '$salary' } 
                maxSalary: {$max: "$salary"},
                minSalary: {$min: '$salary'},
                avgSalary: {$avg: "$salary"}
            }
        }
        // stage - 1
        {
            $project:{
                totalDocument: '$totalDocs', // alias name
                totalSalary: 1,
                maxSalary: 1,
                minSalary: 1,
                avargeSalary: {$round: ['$avgSalary', 2]}
            }
        }
    ])
    ```
    
    > **what do you want to know about more details of $group or $project ? please visit this section:**
    > 
    1. `$group` → [6.3 - **$group stage with using $sum , $push aggregation operators**](https://www.notion.so/6-3-group-stage-with-using-sum-push-aggregation-operators-05534c058bd049adb86865e3af079498?pvs=21) 
    2. $project → [****6.1 - $match , $project aggregation stage****](https://www.notion.so/6-1-match-project-aggregation-stage-51c91fed297d470494a1a57040480959?pvs=21) 
    
## Reference:

1. **$group stage Accumulator operator list:**
    
    [$group (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#accumulator-operator)

# 6.5 - ****Explore $group with $unwind aggregation stage****

**Date : 15/11/23**

**Agenda:**

1. `$group` → [6.3 - **$group stage with using $sum , $push aggregation operators**](https://www.notion.so/6-3-group-stage-with-using-sum-push-aggregation-operators-05534c058bd049adb86865e3af079498?pvs=21) 
2. [$unwind](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/) → Deconstructs an array field from the input documents to output a document for *each* element. Each output document is the input document with the value of the array field replaced by the element.
    
    ## ****Behaviors:****
    
    ****Non-Array Field Path:****
    
    - When the operand does not resolve to an array, but is not missing, `null`, or an empty array, `$unwind` treats the operand as a single element array.
    - When the operand is `null`, missing, or an empty array `$unwind` follows the behavior set for the preserveNullAndEmptyArrays option.
    
    ****Missing Field:****
    
    If you specify a path for a field that does not exist in an input document or the field is an empty array, `$unwind`, by default, ignores the input document and will not output documents for that input document.
    
    To output documents where the array field is missing, null or an empty array, use the preserveNullAndEmptyArrays option.
    
    **Syntax:**
    
    ```jsx
    {
      $unwind:
        {
          path: <field path>,
          includeArrayIndex: <string>,
          preserveNullAndEmptyArrays: <boolean>
        }
    }
    ```
    
    **Example:**
    
    ```jsx
    db.clothing.aggregate( [ { $unwind: { path: "$sizes" } } ] )
    ```
    
    ************************************Practice Example:************************************
    
    ```jsx
    db.test.aggregate([
        // stage - 1
        {
              $unwind: {
                  path: '$interests'
              }
        },
        // stage - 2
        {
            $group: { _id: "$age", totalPerson: {$sum: 1}, interested: {$push: '$interests'}}
        }
    ])
    ```
    
## Reference:

1. MongoDB $unwind aggregation pipeline docs:
    
    [$unwind (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)

# ****6.6 $bucket, $sort, and $limit aggregation stage****

**Date: 16/11/23**

****************Agenda:****************

1. [$bucket](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/) → Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries and outputs a document per each bucket. Each output document contains an `_id` field whose value specifies the inclusive lower bound of the bucket. The output option specifies the fields included in each output document.
    
    `$bucket` only produces output documents for buckets that contain at least one input document.
    
    ### **`$bucket` and Memory Restrictions:**
    
    The `$bucket` stage has a limit of 100 megabytes of RAM. By default, if the stage exceeds this limit, `$bucket` returns an error. To allow more space for stage processing, use the [allowDiskUse](https://www.mongodb.com/docs/manual/reference/command/aggregate/#std-label-aggregate-cmd-allowDiskUse) option to enable aggregation pipeline stages to write data to temporary files.
    
    ## Syntax:
    
    ```jsx
    {
      $bucket: {
          groupBy: <expression>,
          boundaries: [ <lowerbound1>, <lowerbound2>, ... ],
          default: <literal>,
          output: {
             <output1>: { <$accumulator expression> },
             ...
             <outputN>: { <$accumulator expression> }
          }
       }
    }
    ```
    
    ## **Behavior : → [Click here](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/#behavior)**
    
2. [$sort](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/) → Sorts all input documents and returns them to the pipeline in sorted order.
    
    ### **Syntax**
    
    The [`$sort`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort) stage has the following prototype form:
    
    ```jsx
    { $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }
    ```
    
    | Value | Description |
    | --- | --- |
    | 1 | Sort ascending. |
    | -1 | Sort descending. |
    | { $meta: "textScore" } | Sort by the computed textScore metadata in descending order. See Text Score Metadata Sort for an example. |
    
    If sorting on multiple fields, sort order is evaluated from left to right. For example, in the form above, documents are first sorted by `<field1>`. Then documents with the same `<field1>` values are further sorted by `<field2>`.
    
3. **[$limit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)** → Limits the number of documents passed to the next stage in the pipeline.
    
    ### **Syntax**
    
    The `$limit` stage has the following prototype form:
    
    ```jsx
    { $limit: <positive 64-bit integer> }
    ```
    
    ## **Behavior → [Click here](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/#behavior)**

# 6.7 - **$facet, multiple pipeline aggregation stage**

**Date : 16/11/23**

1. **[$facet](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet)** → ****Definition:****
    
    Processes multiple [aggregation pipelines](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline) within a single stage on the same set of input documents. Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.
    
    The `$facet` stage allows you to create multi-faceted aggregations which characterize data across multiple dimensions, or facets, within a single aggregation stage. Multi-faceted aggregations provide multiple filters and categorizations to guide data browsing and analysis. Retailers commonly use faceting to narrow search results by creating filters on product price, manufacturer, size, etc.
    
    Input documents are passed to the `$facet` stage only once. `$facet` enables various aggregations on the same set of input documents, without needing to retrieve the input documents multiple times.
    
    ## Visualizes:
    
    ![$facet visualizes real life work in MongoDB aggregation](https://prod-files-secure.s3.us-west-2.amazonaws.com/6b556a7a-0921-47cb-9ba3-44bf140bacc2/7ec277da-f78e-4fcb-a6f2-e46a982db388/Untitled.png)
    
    $facet visualizes real life work in MongoDB aggregation
    
    ### ****Syntax:****
    
    The `$facet` stage has the following form:
    
    ```jsx
    { $facet:
        {
          <outputField1>: [ <stage1>, <stage2>, ... ],
          <outputField2>: [ <stage1>, <stage2>, ... ],
          ...
        }
    }
    ```
    
    ## Behavior → [Click here](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/#behavior)
    
    ## **Practice Example:**
    ```js
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
```


# 6.8 - ****$lookup stage, embedding vs referencing.mp4****

**Date: 16/11/23**

### Embedded vs Reference

| Embedded | Reference |
| --- | --- |
| One-to-one Relationships | One-to-many-relationships |
| Frequent Reading Data  | Many-to-Many |
| Atomic Updates | Frequent Writing |
| Reduced network overload | Big data size |
| Small Data Size | Scalability |
|                    ___ | Flexibility |

**Agenda:**

1. [`$lookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/) → 
    
    Performs a left outer join to a collection in the *same* database to filter in documents from the "joined" collection for processing. The [$lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) stage adds a new array field to each input document. The new array field contains the matching documents from the "joined" collection. The `[$lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup)` stage passes these reshaped documents to the next stage.
    
    Starting in MongoDB 5.1, [`$lookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) works across sharded collections.
    
    To combine elements from two different collections, use the [`$unionWith`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/#mongodb-pipeline-pipe.-unionWith) pipeline stage.
    

### **Syntax**

The `$lookup` stage has the following syntaxes:

```jsx
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
```

## Practice Example:

```jsx
db.order.aggregate([
    // stage - 1
    // $lookup
    {
        $lookup: {
            from: 'test', // collection name
            localField: 'userId', // local Field name
            foreignField: '_id', // foreign match _id field
            as: 'user' // create a user field and insert foreign data in user array
        }
    },
    // stage - 2
    //$unwind
      {
          $unwind: "$user"
      }

])
```
## Reference:

1. $lookup aggregation pipeline docs:
    
    [$lookup (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)

# 6.9 | 6.10 - ****What is indexing, COLLSCAN vs IXSCAN | Explore compound index and text index****

Date: 16/11/23

Agenda:

1. Indexing → Indexes support efficient execution of queries in MongoDB. Without indexes, MongoDB must scan every document in a collection to return query results. If an appropriate index exists for a query, MongoDB uses the index to limit the number of documents it must scan.
    
    Although indexes improve query performance, adding an index has negative performance impact for write operations. For collections with a high write-to-read ratio, indexes are expensive because each insert must also update any indexes.
    
    ****Use Cases:****
    
    If your application is repeatedly running queries on the same fields, you can create an index on those fields to improve performance.
    
    ****Index Names:****
    
    The default name for an index is the concatenation of the indexed keys and each key's direction in the index (`1` or `-1`) using underscores as a separator. For example, an index created on `{ item : 1, quantity: -1 }` has the name `item_1_quantity_-1`.
    
    You cannot rename an index once created. Instead, you must [drop](https://www.mongodb.com/docs/manual/core/indexes/drop-index/#std-label-drop-an-index) and recreate the index with a new name.
    
    To learn how to specify the name for an index, see [Specify an Index Name.](https://www.mongodb.com/docs/manual/core/indexes/create-index/specify-index-name/#std-label-specify-index-name)
    
    # **Example**
    
    This example creates a single key descending index on the `name` field:
    
    ```jsx
    collection.createIndex( { name : -1 }, function(err, result) {
       console.log(result);
       callback(result);
    }
    ```
    
    ## COLLSCAN VS IXSCAN EXPLAIN:
    
    1. **COLLSCAN (Collection Scan):**
        - **Description:** COLLSCAN involves scanning the entire collection to find the documents that match the query criteria.
        - **When it's used:** COLLSCAN is generally used when there is no index available for the query or when the query conditions cannot be efficiently satisfied using an index.
        - **Performance Implications:** COLLSCAN can be resource-intensive and slow, especially on large collections, as it requires scanning every document in the collection.
    2. **IXSCAN (Index Scan):**
        - **Description:** IXSCAN involves using an index to quickly locate and retrieve the documents that match the query criteria.
        - **When it's used:** IXSCAN is used when there is an index that can be leveraged to satisfy the query conditions efficiently. MongoDB tries to use indexes whenever possible to improve query performance.
        - **Performance Implications:** IXSCAN is generally more efficient than COLLSCAN as it allows MongoDB to directly access a subset of documents using the index structure.
    
    ## T****ext index:****
    
    Text indexes support text search queries on fields containing string content. Text indexes improve performance when searching for specific words or phrases within string content.
    
    A collection can only have **one** text index, but that index can cover multiple fields.
    
    Indexing commonly queried fields increases the chances of covering those queries. Covered queries are queries that can be satisfied entirely using an index, without examining any documents. This optimizes query performance.
    
    **To create a text index, use the following prototype:**
    
    ```jsx
    db.<collection>.createIndex(
       {
          <field1>: "text",
          <field2>: "text",
          ...
       }
    )
    ```
    
    ****Text Search Support:****
    
    Text indexes support [`$text`](https://www.mongodb.com/docs/manual/reference/operator/query/text/#mongodb-query-op.-text) query operations on on-premises deployments. To perform text searches, you must create a text index and use the `$text` query operator.
    
    ************************************Practice example:************************************
    
    ```jsx
    // better performance to using indexing
    // db.massiveData.find({gender: 'male', age: 21}) // query time is 10ms
    // db.massiveData.createIndex({gender: -1, age: 1}) // create a index with gender or age field
    
    // db.massiveData.createIndex({about: 'text'})
    db.massiveData.find({$text: { $search: "dolor" }})
    ```
    

## Reference:

1. Explain Result in MongoDB:
    
    [Explain Results](https://www.mongodb.com/docs/manual/reference/explain-results/)
    
2. Indexes in MongoDB:
    
    [Indexes](https://www.mongodb.com/docs/manual/indexes/)
    
3. Text index in Mongodb:
    
    [Text Indexes](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-text/)

# 6.11 - Practice Task on MongoDB Aggregation

**Date: 16/11/23**

## **Practice Task: MongoDB Aggregation:**

**Question 1:**

- **Retrieve the count of individuals who are active (isActive: true) for each gender.**

**Question 2:**

- **Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana."**

**Question 3:**

- **Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.**

**Question 4:**

Hints: Explore how to use regex [ "friends.name": /^W/]

**Question 5:**

- **Use $facet to separate individuals into two facets based on their age: those below 30 and those above 30. Then, within each facet, bucket the individuals into age ranges (e.g., 20-25, 26-30, etc.) and sort them by name within each bucket.**

**Question 6:**

- **Calculate the total balance of individuals for each company and display the company name along with the total balance. Limit the result to show only the top two companies with the highest total balance.**

Hints: Explore $slice, $split.