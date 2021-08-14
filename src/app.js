const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
//heroku
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//dynamic templates
//set up handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'golbarg'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'golbarg'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help ',
    name:'golbarg'
  })
})


app.get('/weather',(req,res)=>{

  if(!req.query.adresse){
    return res.send({
      error:'you must provide an adresse'
    })
  }

  geocode(req.query.adresse,(error,{latitude,longitude,location}={})=>{
    if(error){
      res.send({  error})
    }

    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }

      res.send({
        forecast:forecastData,
        location,
        adresse:req.query.adresse
      })
    })

  })

})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'you must provide a search term'
    })
  }
  console.log(req.query.search);
  res.send({
    products:[]
  })
})


app.get('/help/*',(req,res)=>{
  res.render('404page',{
    title:'404 page ',
    name:'golbarg',
    errorMsg: 'the help page not found'
  })
})

app.get('*',(req,res)=>{
  res.render('404page',{
    title:'404 page ',
    name:'golbarg',
    errorMsg: 'this page not found'
  })
})


app.listen(port,()=>{
  console.log('web server is running with port'+port);
})