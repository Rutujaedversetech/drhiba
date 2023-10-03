const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  time: String,
});

//module.exports = ImageModel = mongoose.model("Image", imgSchema);

const Slot=mongoose.model("slot",SlotSchema)
     module.exports=Slot
     