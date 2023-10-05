const log=require("../logger")
const User=require("../Schemas/user")
const Request=require("../Schemas/request")
const { createChat } = require("./chat")
const { createRequest } = require("./request")
const mongoose=require("../mongooseConnect")

async function getAllUser() {
    try {
        const user =await User.find()
        return user
    } catch (e) {
        log("database error",e)
    }
    
}

async function finduserById(currentUser_id) {
    try {
        const user =await User.findOne({_id:currentUser_id}).populate("friend")
        return user
    } catch (e) {
        log("database error",e)
    }
    
}
async function findUserByEmailNPass(email,password) {
    try {
        const user =await User.findOne({email:email,password:password}).populate("friend")
        // log("user",user)
        return user
    } catch (e) {
        // log("database error",e.message)
    }
    
}
// friends
async function findFriendById(user_id) {
    try {
        const friends = await User.findById(user_id).populate({
            path: "friend",
            model: User,
            select: { "friend": 0 ,"password":0}
        }).select({"friend":1})
        log("friends",friends)
        return friends
    } catch (e) {
        // log("database error",e)
    }
    
}
// adds friend to user's friend list 
// creates a chat document between user and the friend
async function addFriend(user_id,person_id) {
    const peopleIdArr=[user_id,person_id]
    try {
        const req =await Request.find({
            sender: {
                $in: peopleIdArr
            },
            reciever:{
                $in: peopleIdArr
            }
        }).populate("sender").populate("reciever")
        log("req",req)
        if(req.length > 0){
            // there is already a request between these two 
            // or they are friends already 
            log("req.len > 0 {request already made between these two}")
            return {req_found:true,req:{}}
        }
        const req_obj={
            sender:user_id,
            reciever:person_id,
            hasApproved:false
        }
        const newReq = await createRequest(req_obj)
        // returning request found or not 
        return {req_found:false,req:newReq}
    } catch (e) {
        log("database error",e)
    }
    
}
async function deleteUserById(userId) {
    try {
        const status = await User.deleteOne({_id:userId})
        
        // log("delete status", status)
        return status
    } catch (e) {
        // log("database error",e)
    }
    
}

// only used in create User for uniquness of email
async function findUserByEmail(email) {
    try {
        const user =await User.findOne({email:email})
        // log("user in findUserByEmailNPass",user)
        return user
    } catch (e) {
        // log("database error",e.message)
    }
    
}
// used in sign up 
async function createUser(user_obj) {
    try {
        const person = await findUserByEmail(user_obj.email)
        if(!person){
            // if person is empty
            const user = await User.create(user_obj)
            
            return user
        }
        return null 
        
    } catch (e) {
        log("error",e)
    }
    
}
// modify 
async function modifyUser(user_obj) {
    try {
        const {name,password,image,id} = user_obj
        const user =await User.findOne({_id:id})
        if(!user){
            throw new Error('user not found');
        }
        user.name = name
        user.password = password
        user.image = image
        upadatedUser = await user.save()
        return upadatedUser
        
    } catch (e) {
        log("error",e)
    }
    
}

module.exports={createUser,findUserByEmailNPass,deleteUserById,findFriendById,addFriend,finduserById,getAllUser,modifyUser}
