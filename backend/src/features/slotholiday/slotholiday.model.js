const mongoose = require("mongoose");

const SlotHolidaySchema = new mongoose.Schema({
  date: String,
   time: String,

});

//module.exports = ImageModel = mongoose.model("Image", imgSchema);

const SlotHoliday=mongoose.model("slotholiday",SlotHolidaySchema)
     module.exports=SlotHoliday