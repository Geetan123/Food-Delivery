  const express= require("express")
     const app=  express()

       const mongoose= require("mongoose")
         mongoose.connect("mongodb://127.0.0.1:27017/7pmnode")
const routerfile = require("./router/test3")
   const session=  require("express-session")

     app.use(express.urlencoded({extended:false}))

         app.use(session({
           secret:"geetan",
           resave:false,
           saveUninitialized:false,
          //  cookie:{maxAge:1000*60*60*24*365}      //this field is just for limitation of session time.....mostly it is used for type of Bank sites where we have to set a time of almost 1 minute and auto logout
         }))
         app.use(routerfile)
         app.use(express.static("public"))
         app.set("view engine","ejs")
         app.listen(8000,()=>{console.log("server is running on port 8000")})





         