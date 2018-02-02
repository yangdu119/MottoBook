var AWS = require("aws-sdk");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var getRandomImageURLFromDynamoDB = () => new Promise(function(resolve, reject){
    AWS.config.update({
        region: "us-west-2"
    });

    let docClient = new AWS.DynamoDB.DocumentClient()
    let table = "QuoteImages";
    let totalItems = 5023;
    let id = getRandomInt(totalItems);
    let params = {
        TableName: table,
        Key:{
            "id": id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            //console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return reject(err);
        } else {
            //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            let url = data.Item.imageURL;
            resolve(url);
        }
    });
});


const url = Promise.resolve(getRandomImageURLFromDynamoDB());
url.then(function(url){
    console.log('url', url)
});
