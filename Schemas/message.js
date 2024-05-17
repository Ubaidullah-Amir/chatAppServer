const mongoose=require("mongoose")


const messageSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
        enum: ["text","image","video","pdf"],
      },
    //   the data can be a string text or string url for the above types
    data:{
        type:String
    },
    description:{
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