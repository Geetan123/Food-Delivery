const fs=require("fs")
   //      const txt= fs.writeFileSync("./test.txt","geetanddss")
           const txt1=   fs.readFileSync("./test.txt","utf-8")
   //  console.log(txt1)
 

   

//     async function add() {
//       // const fs=  require('fs')
//         await  fs.writeFile("./test.txt","rishi")
         
//        const a=  await fs.readFile("./test.txt","utf-8")
//        await console.log(a)
//   }
//         add()

const home =   fs.readFileSync("./home.html","utf-8")

       const style =    fs.readFileSync("./style.css")
         const img =   fs.readFileSync("./gulmarg.jpg")
      //  console.log(home)
      // const { setFlagsFromString } = require("v8")
      
      
      
      
      
      const http= require('http') 
 const server= http.createServer((req,res)=>{


     if(req.url==="/"){
        res.write(home)
        res.end("hello gm")
     }
     else if(req.url==="/style.css"){
        res.write(style)
        res.end()
    }
    else if(req.url==="/gulmarg.jpg"){
       res.write(img)
       res.end()
    }
    else if(req.url==="/contact"){
       res.end("here is contact 89849639471")
     }
      else{
        res.end("404,page not found")
      }
    }


    )
    server.listen(5000,()=>{console.log("this server is running on port 5000")})