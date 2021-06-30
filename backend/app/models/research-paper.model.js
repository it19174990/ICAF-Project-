module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        researcher: String,
        description: String,
        email:String,
        phone:String,
        fileType:String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Research = mongoose.model("ResearchPaper", schema);
    return Research;
  }


/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const researchPaperSchema = new Schema({
    title:{
        type:String,
    },
    researcher:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    file:{
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

module.exports = ResearchPaper = mongoose.model("researchPaper",researchPaperSchema);*/