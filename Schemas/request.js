const mongoose=require("mongoose")


const requestSchema = new mongoose.Schema({

    
    hasApproved:{
        type:Boolean,
    },
    reciever:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    sender:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


module.exports=mongoose.model("Request",requestSchema)