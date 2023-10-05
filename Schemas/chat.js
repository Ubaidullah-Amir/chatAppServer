const mongoose=require("mongoose")



const chatSchema = new mongoose.Schema({
    people:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"User"
    },
    conversation:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Message"
    }
})
module.exports=mongoose.model("Chat",chatSchema)