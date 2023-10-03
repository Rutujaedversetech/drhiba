// backend/app.js or index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const Slider = require('./card.model');
const fs = require('fs');
const ImageModel = require('./card.model');
const Service = require('./card.model');
const Card = require('./card.model');

const app = express();



// Handle the file upload
app.post("/upload", (req, res) => {
  console.log(req.file,req.body);
  const saveImage = Card({
    description: req.body.description,

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

  let data=await Card.find()
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
        let blog1=await Card.findById({"_id":id});
        console.log("blog",blog1)
        // if(decoded.id==blog1.author){
          let blog=await Card.findByIdAndDelete({"_id":id});

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
