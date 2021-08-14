const request = require('request')

const forecast = (long , lat , callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=365de82f3106c252ccf992351f52ba6b&query='+long+','+lat

  request({url, json:true},(error,{body})=>{
    if(error){
      callback('unable to connect',undefined)
    }else if(body.error){
      callback('unable to find location',undefined)
    }else{
      callback(undefined,body.current.weather_descriptions[0]+' it is currently '+body.current.temperature+' degrees but it feeels like '+
      body.current.feelslike)
    }
  })
}


module.exports = forecast