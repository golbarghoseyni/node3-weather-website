const request = require('request')

const geocode = (adresse,callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adresse+'.json?access_token=pk.eyJ1IjoiZ29sYmFyZ2hvc3MiLCJhIjoiY2tzM2hubWF6MG5oMDJucGZ5ZXNpY3ZycCJ9.tbRCkH6AYC5OWTuknx7YpQ&limit=1'

  request({url,json:true},(error,{body})=>{
    if(error){
      callback('didnt fint the url',undefined)
    }else if(body.features.length === 0){
      callback('unable to find location',undefined)
    }else{
      callback(undefined,{
        latitude : body.features[0].center[1],
        longitude : body.features[0].center[0],
        location: body.features[0].place_name
            })
    }
  })
}

module.exports = geocode