
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      presenter:String,
      email: String,
      phone: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Workshop = mongoose.model("workshop", schema);
  return Workshop;
}

/*const mongoose = require("mongoose");
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

module.exports = ResearchPaper = mongoose.model("workshop",workshopSchema);*/
