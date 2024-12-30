const express = require('express')
const fs = require('fs')
const morgan =  require('morgan')
const moviesRouter = require('./Routes/moviesRoutes')




let app = express()
const logger = function(req,res,next){
    console.log("aewei")
    next();

}







 app.use(express.json())



 if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
 }

 app.use(express.static('./public/templates'))
 app.use(logger)
 app.use((req,res,next)=>{
  req.requestedAt = new Date().toISOString()
  next()
 })







app.use('/api/v1/movies',moviesRouter)




module.exports = app;