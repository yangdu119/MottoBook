'use strict';

var fetch = require('node-fetch')
const { DOMParser } = require('xmldom');
var xmlToJSON = require('xmltojson')
xmlToJSON.stringToXML = (string) => new DOMParser().parseFromString(string, 'text/xml');
var axios = require('axios')

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

module.exports.quoteImage = (event, context, callback) => {

    let randomeImageURL = Promise.resolve(getRandomImage());

    randomeImageURL.then(function(value){
        console.log('randomeImageURL', value);
        //console.log('event', event);
        //console.log('event.body', event.body);
        let body = event.body;
        let bodyObj = JSON.parse(body);
        let data = bodyObj["data"];

        console.log('data', data);
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
