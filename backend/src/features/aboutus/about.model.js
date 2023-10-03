const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  desc: String,
  addedDate: String,

});

//module.exports = ImageModel = mongoose.model("Image", imgSchema);

const About=mongoose.model("about",aboutSchema)
     module.exports=About