const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    state_code : {type : String,required : true},
    tag_name : {type : String,required : true},
    upvotes : {type : Number,default : 0}
})

const Tag = mongoose.model("Tag",tagSchema)

module.exports = Tag;