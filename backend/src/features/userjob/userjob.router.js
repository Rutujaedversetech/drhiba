const express=require("express")
const Post = require("./userjob.model")
const User=require("../user/user.model");
const jwt=require("jsonwebtoken")
const PDF=require("../userjob/userjob.model");
const multer  = require("multer")
const path=require('path')
const app=express.Router()
//console.log('path',path);
const FormData = require('form-data');
//const fs = require('fs');
const FtpClient = require('ftp');
//const ftp = require('ftp');
const fs = require('fs');
//const ftpClient = new ftp();
const fs123 = require('../../../index');
const ftp = require('basic-ftp');



const axios = require('axios');
const Blog = require("../blog/blog.model");
const { log } = require("util");
const ftpConfig = {
  host: '68.178.149.80',
  port: 21, // Default FTP port
  user: 'Rutujalomate@edversetech.com',
  password: 'rutuja@1'
};
const twilio = require('twilio');

const accountSid = 'AC306d22d172cc37d63a03a11263d31f86';
const authToken = '5376de12b94e1eea62ff7180670a1633';
const client = twilio(accountSid, authToken);

// const storage=multer.diskStorage({
//   destination:'C:/Uploads/',
//   // function (req,file,cb) 
//   // {
//   //   cb(null,path.join('file:///C:',"ploads"),function(error,sucess){
//   //     if(error) throw error
//   //   })
  
//   // },
//   filename:function(req,file,cb) {
//     const name=file.originalname
//     cb(null,name,function(e1,s1){
//       if(e1) throw e1

//     })
//   }
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the directory where files will be stored
  },
  filename:function(req,file,cb) {
        const name=file.originalname
        cb(null,name,function(e1,s1){
          if(e1) throw e1
    
        })
    }
});
const upload = multer({ storage:storage })
const filePath='index.js'

app.post("/uploads/:id",upload.single('file'),async(req,res)=>{
   const token=req.headers["token"]
  const { id } = req.params;
  const user = await Blog.findById(id);
  const { name } = req.body;

  if (user) {
  

    try{
        

       const decoded=jwt.decode(token)

      try {
        const newPDF = new PDF({
          file: req.file.path,
          data: req.file.buffer,
          user:user,
          name:name,
          userId:user._id,
          user_email:user.oemail,
          role:decoded.role
        });
    
       const data= await newPDF.save();
    
        res.send(data);
console.log('====================================');
console.log('datax',data);
console.log('====================================');
        // const ftpConfig = {
        //   host: '68.178.149.80',
        //   port: 21, // Default FTP port
        //   user: 'Rutujalomate@edversetech.com',
        

        //   password: 'rutuja@1'
        // };
        // const remoteFilePath = '/home/sfsrxybd18ow/public_html/edversetech.com/Rutujalomate/1689669197018-Rutuja-Lomate-Resume.pdf'; // Replace with the remote file path where you want to upload the file

        // (async () => {
        //   const client = new ftp.Client();
        //   try {
        //   //  console.log(await client.list())
        
        //     await client.access(ftpConfig);
        //     await client.ensureDir(remoteFilePath)
        //     await client.clearWorkingDir()
        //     await client.uploadFromDir("uploads")
        //     // await client.uploadFrom('jbjb',remoteFilePath);
        //      client.ftp.verbose = true
        
        
        //     console.log('File uploaded successfully!');
        //   } catch (err) {
        //     console.error('Error uploading the file:', err);
        //   } finally {
        //     client.close();
        //   }
        // })();












      } catch (error) {
        res.status(500).send('Error uploading file.');
      }    

    }catch(e){
        res.send(e.message)
    }
  }
  else{
    res.send("user not found")
  }
})




app.post("/ftps",upload.single('file'),(req,res)=>{
 console.log(req.file,req.file.path);
const remoteUrl ='/home/sfsrxybd18ow/public_html/edversetech.com/Rutujalomate/1689669197018-Rutuja-Lomate-Resume.pdf'
 

const localFilePath = path.join(__dirname, 'hi.txt'); // Replace with the local file path you want to upload
const remoteFilePath = '/home/sfsrxybd18ow/public_html/edversetech.com/Rutujalomate/1689669197018-Rutuja-Lomate-Resume.pdf'; // Replace with the remote file path where you want to upload the file
console.log(req.file.destination);
const filePath = 'C:/Users/rutuj/Documents/DoctorsApi/backend/uploads/file.txt';
const ftpConfig = {
  host: '68.178.149.80',
  port: 21, // Default FTP port
  user: 'Rutujalomate@edversetech.com',

  password: 'rutuja@1'
};
fs.stat('hi.txt', (err, stats) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    if (stats.isFile()) {
      console.log('The localFilePath is a file.');
      // Perform the FTP upload here
    } else if (stats.isDirectory()) {
      console.error('The localFilePath is a directory. Please provide the path to a file.');
    } else {
      console.error('The localFilePath is neither a file nor a directory.');
    }
  }
});
(async () => {
  const client = new ftp.Client();
  try {
  //  console.log(await client.list())

    await client.access(ftpConfig);
    await client.ensureDir(remoteFilePath)
    await client.clearWorkingDir()
    //await client.uploadFromDir("uploads")
   const localFilePath= 'C:/Uploads/1685173756717-Rutuja-Lomate-Resume.pdf'
     await client.uploadFrom(req.file.path,remoteFilePath);
    // client.ftp.verbose = true



    console.log('File uploaded successfully!');
  } catch (err) {
    console.error('Error uploading the file:', err);
  } finally {
    client.close();
  }
})();

//ftp.connect(ftpConfig);
    


    



      





  
  
  //const localFilePath = 'path/to/your/local/file.ext';
  const serverConfig = {
    host: '68.178.149.80',
    port: 21, // Default FTP port
    user: 'Rutujalomate@edversetech.com',
    password: 'rutuja@1'
  };
 
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.setHeader('Content-Disposition', 'attachment; filename="file.txt"');
//       res.send(data);
//     }

// });
  
//   ftp.connect({
//     host: '68.178.149.80',
// port: 21, // Default FTP port
// user: 'Rutujalomate@edversetech.com',
// password: 'rutuja@1'
//   });
});

  
  
  //uploadFilen();
  
  



//+15017122661



app.get("/sms",(req,res)=>{

  async function checkMobileNumber(number) {
    const accountSid1 = 'AC306d22d172cc37d63a03a11263d31f86';
    const authToken2 = '5376de12b94e1eea62ff7180670a1633';
    const twilioPhoneNumber = +13253997702;
  
    const url = `https://lookups.twilio.com/v1/PhoneNumbers/${number}?Type=carrier`;
  
    try {
      const response = await axios.get(url, {
        auth: {
          username: accountSid1,
          password: authToken2,
        },
      });
  
      // Check the status of the mobile number
      if (response.data && response.data.carrier && response.data.carrier.type !== 'landline') {
        return true; // Mobile number exists
      } else {
        return false; // Mobile number does not exist or is a landline
      }
    } catch (error) {
      console.error('Error checking mobile number:', error);
      return false;
    }
  }
  
  // Example usage
  const mobileNumber = '+916266390748';
  checkMobileNumber(mobileNumber)
    .then(result => {
      console.log(result);
      if(result){
          client.messages
  .create({
    body: 'Hello from Doctor,Your appointment is confirmed ',
    from: '+13253997702',
    to: '+919370060152'
  })
  .then(message => console.log('SMS sent. Message SID:', message.sid))
  .catch(error => console.error('Error sending SMS:', error));



      }
    })
    .catch(error => {
      console.error('Error:', error);
    });








  // client.messages
  // .create({
  //   body: 'Hello from Twilio!',
  //   from: '+13253997702',
  //   to: '+919370060152'
  // })
  // .then(message => console.log('SMS sent. Message SID:', message.sid))
  // .catch(error => console.error('Error sending SMS:', error));








})







app.get("/getall",async(req,res)=>{

  const token=req.headers["token"]

    try{
      const decoded=jwt.decode(token)

      let blogs=await PDF.find()

    res.status(200).json({ blogs });
     //   }
      //  else{
           // res.send("please signup")
       // }
    
}catch(e){
    res.send(e.message)
}
})


app.get("/getall/:id",async(req,res)=>{
  let id=req.params.id

 
  try{

  let blogs=await PDF.find({"userId":id})
res.send(blogs)
  //res.status(200).json({ blogs });
   //   }
    //  else{
         // res.send("please signup")
     // }
  
}catch(e){
  res.send(e.message)
}
})









app.get("/download/:id",async(req,res)=>{

  const { id } = req.params;
  const item = await PDF.findById(id);
  if (!item) {
    // return next(new Error("No item found"));
    res.send('item not found')
  }
  const file = item.file;
console.log(file);
  const filePath = path.join(`../${file}`);
  res.download(file);

    try{
   

    
}catch(e){
    res.send(e.message)
}
})


app.delete("/:id", async(req,res)=>{
  let id=req.params.id
 console.log("id",id);

//  const token=req.headers["token"]

  try{
      
      //const decoded=jwt.decode(token)
      //console.log(decoded);

      // if(decoded.role ==="user" || decoded.role==="admin" ){
          let blog1=await PDF.findById({"_id":id});
          console.log("blog",blog1)
          // if(decoded.id==blog1.author){
            let blog=await PDF.findByIdAndDelete({"_id":id});

              if(blog){
              res.send('blog deleted')
          // }else{
          //     res.send("blog is not found to delete")
          // }  
        // }else{
        //     res.send(' cant delete other writers blog')
        // }

      }
else{
return  res.status(403).send('not found to delete pdf')
     
//res.send(blog)

}        

  }catch(e){
      res.send('can not find blog by this id ')
  }

})




//app.patch("/update/:id", async(req,res)=>{
  app.patch("/update/:id",upload.single('file'),async(req,res)=>{

  let id=req.params.id
 

  //const token=req.headers["token"]

  try{
      
     // const decoded=jwt.decode(token)
     // console.log(decoded);

      

//if(decoded.role ==="doctor"  ){
  //let user=await Contact.findById({"_id":id});
 // console.log("blog",contacteduser)
      let contactreduser=await PDF.findByIdAndUpdate({"_id":id},{...req.body,
        file: req.file.path,
          data: req.file.buffer,
          name:req.body.name,
      },{new:true})

      if(contactreduser){
        // const result = await SlotHoliday.deleteMany({
        //   date: req.body.date,
        //   time: req.body.time,
        // });
        // console.log('====================================');
        // console.log('result',result);
        // console.log('====================================');
      console.log('====================================');
      console.log('contactreduser',contactreduser);
      console.log('====================================');
      res.send(contactreduser)
  }else{
      res.send("user is not found to update")
  }  


// }
// else{
// return  res.status(403).send('not allowed to update blog')

// //res.send(blog)

// }        
}catch(e){
      res.send(e.message)
  }

})

  

  
module.exports=app