   const { db } = require("../models/emp")
const Emp= require("../models/emp")

      
    exports.empformshow=(req, res) => {
        res.render("emp.ejs")
     }

       exports.empinsert=(req, res) => {
        console.log(req.body)
        console.log(req.file)
        const filename = req.file.filename
        const { ename, esalary, eDOJ, ecompany } = req.body
        const record = new Emp({
           empname: ename,
           empcompany: ecompany,
           empsalary: esalary,
           empDOJ: eDOJ,
           img: filename
         })
         record.save()
         res.redirect("/selection")
       }

        exports.empselection=async (req, res) => {
            const record = await Emp.find()
            //  console.log(record)
            res.render("selection.ejs", { record })
         }

          exports.empdelete=async (req, res) => {
            const id = req.params.abc
            await Emp.findByIdAndDelete(id)
         
            res.redirect("/selection")
         }

           exports.empupdateform=async (req, res) => {
            const id = req.params.xyz
            console.log(id)
            const record = await Emp.findById(id)
            res.render("empupdate.ejs", { record })
         }

           exports.empupdate=async (req, res) => {
            console.log(req.body)
            const id = req.params.id
            const { ename, ecompany, esalary, eDOJ } = req.body
            if (eDOJ) {
               await Emp.findByIdAndUpdate(id, { empname: ename, empcompany: ecompany, empsalary: esalary, empDOJ: eDOJ })
            }
            else {
               await Emp.findByIdAndUpdate(id, { empname: ename, empcompany: ecompany, empsalary: esalary })
         
            }
            res.redirect("/selection")

             
         }

            exports.empsingleselection=async (req, res) => {
               const record = await Emp.findOne()       //you can fetch condtional value also like:-    Emp.findone({empname:"lovesh"})
               res.render("singleselection.ejs", { record })
               console.log(record)
            }
            
      

         

      