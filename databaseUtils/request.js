const log=require("../logger")
const Request = require("../Schemas/request")
const User = require("../Schemas/user")
const { createChat } = require("./chat")
const mongoose=require("../mongooseConnect")

// for displaying all the requests
async function getAllRequests(user_id) {
    try {
        const req =await Request.find({
            hasApproved:false,
            reciever:user_id
        }).populate("reciever").populate("sender")

        log("req",req)
        return req
    } catch (e) {
        log("database error",e)
    }
    
}
// creating request object
async function createRequest(req_obj) {
    try {
        const req =await Request.create(req_obj)
        return req
    } catch (e) {
        log("database error",e)
    }3
    
}
// 
async function requestAccepted(user_id,person_id) {
    try {
        const updateStatus =await Request.findOneAndUpdate({
            hasApproved:false,
            reciever:user_id,
            sender:person_id 
        },{hasApproved:true})
        const updatedReq =await Request.find({
            reciever:user_id,
            sender:person_id 
        })
        // now deleting redundant request if any
        const deleteStatus =await Request.findOneAndUpdate({
            hasApproved:false,
            reciever:person_id,
            sender:user_id 
        },{hasApproved:true})
        // since now two person ar friends so
        // add id's of one person to another for both of them 
        const addfriend1=await addfriend(user_id,person_id)
        const addfriend2=await addfriend(person_id,user_id)
        if(addfriend1 || addfriend2){
            throw new Error('friend already exists in friend list ')
        }

        // and create a empty conversation chat document 
        const chat_obj={
            people:[user_id,person_id],
            conversation:[]
        }
        const chat= await createChat(chat_obj)
        const user = await User.findOne({_id:user_id}).populate("friend")
        return {user,person_id}
    } catch (e) {
        log("database error",e)
    }
    
}








// not important function
async function addfriend(user_id,friend_id){
    const user = await User.findOne({_id:user_id})
    console.log("user",user)
    if(user.friend.includes(friend_id)){
        // user alreaddy has this friend in his friend list
        return 
    }
    const status = await User.updateOne({_id:user_id},{$push:{friend:friend_id}})
        if(!status.acknowledged){
            throw new Error("Not acknowledged")
        }
}
module.exports={requestAccepted,getAllRequests,createRequest}
