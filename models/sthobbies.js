    const mongoose= require("mongoose")
             

           const sthobbiesschema=  mongoose.Schema({
                     studentName:String,
                     studentLastname:String,
                     studentEmail:String,
                    //  studenthobby:String,
                     studenthobbies1:String,
                     studenthobbies2:String,
                     studenthobbies3:String
           })
             module.exports=   mongoose.model("sthobbies", sthobbiesschema)