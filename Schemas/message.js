const mongoose=require("mongoose")


const messageSchema = new mongoose.Schema({

    text:{
        type:String
    },
    from:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    to:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})






module.exports=mongoose.model("Message",messageSchema)