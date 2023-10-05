const mongoose=require("mongoose")

const addressSchema = new mongoose.Schema({
    city:{
        type:String
    },
    country:String
})

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        minLength:10,
        maxLength:20
    },
    email:{
        type:String,
        minLength:20,
        maxLength:30
    },
    age:{
        type:Number,
        min:20,
        max:30,
        immutable:true,
        required:true
    },
    friend:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"User"
    },
    address: {type:addressSchema , required:true},
})






module.exports=mongoose.model("User",userSchema)