const express = require("express");
const papers = express.Router();

const Research = require("../../models/Papers");

research_paper.route("/addResearchPaper").post(function(req,res){
    let research = new Research(req.body);
    research.save()
    .then(research=>{
        res.status(200).json({"research":"research paper added successfully"});
    })

    .catch(err=>{
        res.status(400).send("unable to save")

    })
})

research_paper.route("/").get(function(req,res){
    Research.find(function(err,research){
        if(err){
            console.log(err);
        }else{
            res.json(resaerch);
        }
    })
})

research_paper.route("/delete/:id").get(function(req,res){
    Research.findByIdAndRemove({_id: req.params.id },function(err,research){
        if(err){
            res.json(err);
        }else{
            res.json("successfully removed");
        }
    })
})

module.exports = research_paper;