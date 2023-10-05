const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({

    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    },
    friend:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"User"
    }
})


module.exports=mongoose.model("User",userSchema)