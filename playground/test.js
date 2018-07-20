var AWS = require("aws-sdk");

AWS.config.update({
  region: "ca-central-1",
  endpoint: "https://dynamodb.ca-central-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Products",
    KeySchema: [
        { AttributeName: "model", KeyType: "HASH" },
        { AttributeName: "shop", KeyType: "RANGE"},
        // { AttributeName: "brand", KeyType: "RANGE"},
        // { AttributeName: "price", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        { AttributeName: "model", AttributeType: "S" },
        { AttributeName: "shop", AttributeType: "S" },
        // { AttributeName: "brand", AttributeType: "S" },
        // { AttributeName: "price", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
