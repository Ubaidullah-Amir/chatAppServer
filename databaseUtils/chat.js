const log=require("../logger")
const Chat=require("../Schemas/chat")
const User=require("../Schemas/user")
const { createMsg } = require("./message")
const mongoose=require("../mongooseConnect")

async function findchatByID(chat_id) {
    try {
        // .populate("people").populate("conversation")
        const chat=await Chat.find({_id:chat_id}).populate("people").populate("conversation")
        return chat
    } catch (e) {
        // log("error",e)
    }
    
}
// finding chat using user and friend 's id
async function findchat(user_id,friend_id) {
    const ids=[friend_id,user_id]
    try {
        const chat=await Chat.findOne({people:{$all: ids}}).populate({
            path: 'people',
            model: User,
            select: {'name':1,"email":1} 
        }).populate("conversation")
        return chat
    } catch (e) {
        log("error",e)
    }
    
}

// add msg to chat's conversation
async function addMsgToChat(chat_id,msg_obj) {
    try {
        const msg=await createMsg(msg_obj)
        // log("msg is :",msg)
        const chat = await Chat.updateOne({_id:chat_id},{$push:{conversation:msg.id}})
        return msg
        // log("Message added",chat)
    } catch (e) {
        // log(e)
    }
    
}
// delete a chat using id
async function deletechat(chat_id) {
    try {
        await Chat.findByIdAndUpdate(chat_id,{conversation:[]})
        
    } catch (e) {
        throw new Error(e.message)
    }
    
}

async function createChat(Chat_obj) {
    try {
        const chat = await Chat.create(Chat_obj)
        // log("Chat",chat)
        return chat
    } catch (e) {
        // log("error",e)
    }
    
}
module.exports={findchat,findchatByID,addMsgToChat,deletechat,createChat}

