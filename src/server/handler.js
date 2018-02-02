'use strict';
var fetch = require('node-fetch')
const { DOMParser } = require('xmldom');
var xmlToJSON = require('xmltojson')
xmlToJSON.stringToXML = (string) => new DOMParser().parseFromString(string, 'text/xml');
var axios = require('axios')
var AWS = require("aws-sdk");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomImage() {
    let returnURL = '';
    let request = {};
    request.headers = {'Accept': 'text/html,application/xhtml+xml,application/xml'}
    request.url = 'https://s3-us-west-2.amazonaws.com/mottobook-images/';

    return axios.get(request.url, {
        method: 'get',
        responseType: 'document'
    })
        .then(
            response => {
                let result = xmlToJSON.parseString(response.data);
                let length = result['ListBucketResult'][0]['Contents'].length
                let allItems = result['ListBucketResult'][0]['Contents'];
                let images = []

                let random = getRandomInt(length);
                let randomImageItem = allItems[random]
                let filename = randomImageItem['Key'][0]['_text'];
                let url = request.url + filename

                return url;

            }
        )
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

module.exports.quoteImage = (event, context, callback) => {

    let randomeImageURL = Promise.resolve(getRandomImageURLFromDynamoDB());

    let body = event.body;
    let bodyObj = JSON.parse(body);
    let data = bodyObj["data"];

    console.log('data', data);

    randomeImageURL.then(function(value){
        console.log('randomeImageURL', value);

        data.imageUrl = value;
        const response = {
            isBase64Encoded: false,
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'success',
                randomURL : value,
                data: data,
            })
        };
        callback(null, response);
    }).catch(function(error){
        console.log('get Random Image error', error);

        const defaultValue = 'https://images.pexels.com/photos/414318/pexels-photo-414318.jpeg?h=350&auto=compress&cs=tinysrgb';
        data.imageUrl = defaultValue;
        const response = {
            isBase64Encoded: false,
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'success',
                randomURL : defaultValue,
                data: data,
            })
        };
        callback(null, response);

    });

}

module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
