// backend/app.js or index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
//const Slider = require('./slideshow.model');
const fs = require('fs');
const Beforeafter = require('./beforeafter.model');

const app = express();
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed

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
const upload = multer({ dest: 'Slideshowmedia/' })


// Handle the file upload

app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), async (req, res) => {
    try {
        // const uploadedImages = req.files; // Array of uploaded image files

        // if (uploadedImages.length !== 2) {
        //   return res.status(400).json({ error: 'Please upload exactly two images' });
        // }
    
        const imageRecord = {
             image1 :req.files['image1'][0].path,
             image2 : req.files['image2'][0].path,
          
        };
    
        const insertedImage = await Beforeafter.create(imageRecord);
        res.send(insertedImage)
    
       // res.status(201).json({ message: 'Images uploaded and saved to the database', image: insertedImage });
    } catch (error) {
     // res.status(500).json({ error: 'An error occurred while uploading images' });
      res.send(error)

    }
  });



app.get("/getall",async(req,res)=>{

 
    try{

    let data=await Beforeafter.find()
res.send(data)
   // res.status(200).json({ data });
     //   }
      //  else{
           // res.send("please signup")
       // }
    
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
          let blog1=await Beforeafter.findById({"_id":id});
          console.log("blog",blog1)
          // if(decoded.id==blog1.author){
            let blog=await Beforeafter.findByIdAndDelete({"_id":id});

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
