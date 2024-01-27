 const mongoose= require("mongoose")
 
  const empschema= mongoose.Schema({
     empname:String,
     empcompany:String,
     empsalary:Number,
     empDOJ:Date,
     postedDate:{type:Date,default:new Date()},
     img:String
    })
     module.exports=mongoose.model("employee",empschema)
  
    

     