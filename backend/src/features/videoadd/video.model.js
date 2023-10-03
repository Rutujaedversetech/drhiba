const mongoose=require("mongoose")

const VideoSchema=new mongoose.Schema({
    

   

   video:{type:String}, 
 

   
  })
     const Video=mongoose.model("video",VideoSchema)
     module.exports=Video