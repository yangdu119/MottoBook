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


//pro
// let randomeImageURL = Promise.resolve(getRandomImage());
//
// randomeImageURL.then(function(value){
//     console.log(value)
// })




export default async (event) => {
    console.log(event.data);
    // let randomeImageURL = Promise.resolve(getRandomImage());
    //
    // randomeImageURL.then(function(value){
    //     console.log('randomeImageURL', value);
    //     event.data.imageUrl = value;
    //
    //     return {data: event.data}
    // });
    return {data: event.data}

}