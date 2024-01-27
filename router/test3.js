const router = require("express").Router()

const multer = require("multer")
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./public/upload")
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
   }
})
const upload = multer({
   storage: storage,
   limits: { fileSize: 1024 * 1024 * 4 }
})
const nodemailer = require("nodemailer")
// const Emp = require("../models/emp.js")
const student = require("../models/student.js")
const Student = require("../models/student.js")
const Reg = require("../models/reg1")
const empc= require("../controllers/empcontroller")

    function handlelogin(req,res,next){
        if(req.session.isAuth){
           next()
        }
        else{
          res.redirect("/login")
        }
    }
   
const Sthobbies = require("../models/sthobbies")
// const { findByIdAndDelete } = require("../models/student.js")
router.get("/", (req, res) => {
   res.render("index.ejs")
})
router.get("/about", (req, res) => {
   res.render("about.ejs")
})
router.get("/contact/:name", (req, res) => {
   console.log(req.params.name)
   res.send("this is contact page")
})
router.get("/reg", (req, res) => {
   res.render("reg.ejs")
})
router.post("/register", (req, res) => {

   console.log(req.body)

})


router.get("/std", (req, res) => {
   res.render("std.ejs")
})

router.post("/student", (req, res) => {
   console.log(req.body)
   const { sname, sage, sschool, sclass } = req.body
   const record = new Student({
      studentname: sname,
      studentschool: sschool,
      studentage: sage,
      studentclass: sclass
   })
   record.save()   
   res.redirect("/stdselection")
})

router.get("/stdselection", async (req, res) => {
   const record = await Student.find()
   //  console.log(record)
   res.render("stdselection.ejs", { record })
})

router.get("/stddelete/:id",async(req,res)=>{
   const id= req.params.id
        await student.findByIdAndDelete(id)
      res.redirect("/stdselection")
})



router.get("/emp",handlelogin, empc.empformshow )
router.post("/employee", upload.single("img"), empc.empinsert)
router.get("/selection",handlelogin, empc.empselection)
router.get("/empdelete/:abc", empc.empdelete)
router.get("/empupdate/:xyz", empc.empupdateform)
router.post("/emprecordupdate/:id", empc.empupdate)
router.get("/singleselection",empc.empsingleselection )



router.get("/checkform", (req, res) => {
   res.render("checkbox.ejs")
})

router.post("/checkform", (req, res) => {
   console.log(req.body)
   //    const naam=req.body.naam
   const { naam, Ln, ee } = req.body
   const h1 = req.body.hobby
   //    console.log(naam)
   console.log(h1)
   // const g= [h1[0],h1[1],h1[2]]
   // const hobb= h1
   // const hobby1
   //    const hobby2 
   //    const hobby3 
   let hobby1
   let hobby2
   let hobby3
   if (h1.length == 3) {
      hobby1 = h1[0]
      hobby2 = h1[1]
      hobby3 = h1[2]
   }
   else if (h1.length == 2) {
      hobby1 = h1[0]
      hobby2 = h1[1]
      hobby3 = null
   }
   else if (h1.length > 3) {
      hobby1 = h1
      hobby2 = null
      hobby3 = null
   }
   else if (h1.length == 1) {
      hobby1 = h1
      hobby2 = null
      hobby3 = null
   }
   console.log(hobby1)
   //   if(h1=="cricket"||h1=="music"||h1=="football")({

   //    studenthobby:h1,
   //     hobby1: false,
   //     hobby2:false,
   //     hobby3:false
   //   })
   //   else({
   //    studenthobbies1: hobby1,
   //    studenthobbies2: hobby2,
   //    studenthobbies3: hobby3
   //   })

   // console.log(hobby1)
   // console.log(hobby1, hobby2, hobby3)

   const record = new Sthobbies({
      studentName: naam,
      studentLastname: Ln,
      studentEmail: ee,
      // studenthobby:h1,
      studenthobbies1: hobby1,
      studenthobbies2: hobby2,
      studenthobbies3: hobby3
      // studenthobby:hobb
   })
   record.save()
   // console.log(record)
   res.redirect("/sthobbysel")
})

router.get("/sthobbysel", async (req, res) => {
   const record = await Sthobbies.find()
   res.render("stdhobbysel.ejs", { record })
})






router.get("/mail", (req, res) => {
   res.render("mail.ejs")
})
router.post("/sendmail", upload.single("attachment"), async (req, res) => {
   console.log(req.body)
   console.log(req.file)
   const path = req.file.path
   const { emailto, emailfrom, subject, body } = req.body

   let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: "geetank797@gmail.com", // generated ethereal user
         pass: "oqwfsizvgnjcsnue", // generated ethereal password
      },
   });
   console.log("created smtp server")
  
   let info = await transporter.sendMail({
      from: emailfrom, // sender address
      to: emailto, // list of receivers
      subject: subject, // Subject line
      text: body,
      attachments: [
         { path: path }
      ]
      // plain text body
      // html: "<table border=1><tr><th>welcome home</th></tr></table>", // html body
   });
})

router.get("/reg1", (req, res) => {
   res.render("registration.ejs")
})
router.post("/reg1records", async (req, res) => {
   //  console.log(req.body)
   const { us, pass } = req.body
   const usercheck = await Reg.findOne({ username: us })
   console.log(usercheck)

   if (usercheck == null) {
      const record = new Reg({
         username: us,
         password: pass
      })
      await record.save()
       res.redirect("/login")
      //  console.log(record)
   }
   else {
      res.send(`${us} is already existed`)
   }
})
router.get("/login", (req, res) => {
   res.render("login.ejs")
})
router.post("/loginrecords", async (req, res) => {
   // console.log( req.body)
   const { us, pass } = req.body
   const record = await Reg.findOne({ username: us })
   console.log(record)
   if (record !== null) {
      if (record.password == pass) {
         req.session.isAuth=true     // this is trigger
         res.redirect("/selection")
      }
      else {
         res.redirect("/login")
      }
   }
  
    else {
      res.redirect("/login")
   }
})


   router.get("/logout",(req,res)=>{
       req.session.destroy()
       res.redirect("/login")
   })
module.exports = router


  