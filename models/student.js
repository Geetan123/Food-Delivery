     const mongoose= require("mongoose")

     studentschema=  mongoose.Schema({
         studentname: String,
         studentschool:String,
         studentage:Number,
         studentclass:Number
     })
        
          module.exports= mongoose.model("student",studentschema)
            




        