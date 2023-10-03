// backend/app.js or index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const Slider = require('./service.model');
const fs = require('fs');
const ImageModel = require('./service.model');
const Service = require('./service.model');

const app = express();

// Set up the file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Slideshowmedia'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  }
});

//const upload = multer();
const upload2 = multer({ storage: storage });
const upload = multer({ dest: 'Slideshowmedia/' })

// Handle the file upload
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file,req.body);
  const saveImage =  Service({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,

    image:req.file.path
  });
  saveImage
    .save()
    .then((res) => {
      console.log("data is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send(saveImage)
});


app.get("/getall",async(req,res)=>{

 
  try{

  let data=await Service.find()
res.send(data)

  
}catch(e){
  res.send(e.message)
}
})


app.delete("/:id", async(req,res)=>{
let id=req.params.id
console.log("id",id);

// const token=req.headers["token"]

try{
    
    // const decoded=jwt.decode(token)
    // console.log(decoded);

    // if(decoded.role ==="doctor" || decoded.role==="admin" ){
        let blog1=await Service.findById({"_id":id});
        console.log("blog",blog1)
        // if(decoded.id==blog1.author){
          let blog=await Service.findByIdAndDelete({"_id":id});

            if(blog){
            res.send('data deleted')

        }else{
            res.send("data is not found to delete")
        }  
      // }else{
      //     res.send(' cant delete other writers blog')
      // }

//       }
// else{
// return  res.status(403).send('not allowed to delete oppointment')
   
// //res.send(blog)

// }        

}catch(e){
    res.send('can not find blog by this id ')
}

})










module.exports=app
