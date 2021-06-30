const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  title:{
      type:String,
  },
  presenter:{
      type:String,
  },
  email:{
      type:String,
  },
  phone:{
      type:String,
  },
  fileType:{
      type:String,
  },
  review_status:{
      type:Boolean,
      defalut:false
  },
  review_date:{
      type:Date
  }

});

module.exports = Workshops = mongoose.model("workshop",workshopSchema);