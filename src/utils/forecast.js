const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=300b24af38063e4f6d8d6f3e4c3157aa"

    request({url, json: true}, (error, response) =>{
        if (error)
        {
            callback('You are not conncectd to location service!', undefined)
        } else if(response.body.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, response.body.weather[0].description)
        }
    })
}

module.exports = forecast