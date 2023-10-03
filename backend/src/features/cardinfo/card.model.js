const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  description: String,
});

//module.exports = ImageModel = mongoose.model("Image", imgSchema);

const Card=mongoose.model("card",CardSchema)
     module.exports=Card