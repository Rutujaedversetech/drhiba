const mongoose = require("mongoose");

const DateHolidaySchema = new mongoose.Schema({
  dateH: String,
});

//module.exports = ImageModel = mongoose.model("Image", imgSchema);

const Dateholiday=mongoose.model("holiday",DateHolidaySchema)
     module.exports=Dateholiday