const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  image:String
});

//module.exports = ImageModel = mongoose.model("Image", imgSchema);

const Service=mongoose.model("service",ServiceSchema)
     module.exports=Service