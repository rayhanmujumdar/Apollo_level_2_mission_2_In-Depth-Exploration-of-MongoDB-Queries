// delete order of collection
db.Orders.drop({writeConcern: {w: 1}})