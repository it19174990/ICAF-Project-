const mongoose = require("mongoose");
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

module.exports = ResearchPaper = mongoose.model("researchPaper",researchPaperSchema);