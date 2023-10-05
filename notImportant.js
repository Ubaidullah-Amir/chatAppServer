const log=require("./logger")
const mongoose=require("mongoose")
const User=require("./Schemas/user")
const Message=require("./Schemas/message")
const Chat=require("./Schemas/chat")



mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>{log("connected")}).catch((e)=>{log(e)})


const ubaid="64280fdf9d42825e5e2a108f"
const umer="64280c50275327e9fe01e8d6"
const msg_id="642812f0b23bc7909b785ff3"
const chat_id="6428162fb0f6d126430c50b1"
const message_obj={
    to:umer,
    from:ubaid,
    text:"hello world"
}

const user_obj={
    name:"ubaid",
    email:"ubaid",
    password:"ubaid",

}



async function finduser(currentUser_id) {
    try {
        const user =await User.findOne({_id:currentUser_id}).populate("friend").limit(1)
        log("user",user)
    } catch (e) {
        log("error",e)
    }
    
}
async function updateFriendList(currentUser_id,friend_id) {
    try {
        const user = await User.updateOne({_id:currentUser_id},{$push:{friend:friend_id}})
        log("updateuser",user)

    } catch (e) {
        log(e)
    }
    
}
async function deleteUser(currentUser_id) {
    try {
        log("deleted")
        await User.deleteOne({_id:currentUser_id})
    } catch (e) {
        log(e)
    }
    
}



// "64280fdf9d42825e5e2a108f"   ---ubaid
// "64280c50275327e9fe01e8d6"  --- Umer


async function createUser(user_obj) {
    try {
        const user =await User.create(user_obj)
        log("user",user)
    } catch (e) {
        log("error",e)
    }
    
}
// createUser(user_obj)



async function findmsg(msg_id) {
    try {
        const msg=await Chat.findOne({_id:msg_id}).populate("to").populate("from").limit(1)
        log("Chat",msg)
    } catch (e) {
        log("error",e)
    }
    
}
// findmsg(msg_id)



// async function updateFriendList(currentChat_id,friend_id) {
//     try {
//         const Chat = await Chat.updateOne({_id:currentChat_id},{$push:{friend:friend_id}})
//         log("updateChat",Chat)

//     } catch (e) {
//         log(e)
//     }
    
// }
async function deletemsg(msg_id) {
    try {
        
        await Chat.deleteOne({_id:msg_id})
        log("deleted")
    } catch (e) {
        log(e)
    }
    
}




async function createChat(Chat_obj) {
    try {
        const msg =await Chat.create(Chat_obj)
        log("Chat",msg)
    } catch (e) {
        log("error",e)
    }
    
}
// createChat(Chat_obj)





async function findchat(chat_id) {
    try {
        const chat=await Message.findOne({_id:chat_id}).populate("to").populate("from").limit(1)
        log("Message",chat)
    } catch (e) {
        log("error",e)
    }
    
}
// findchat(chat_id)
// async function updateFriendList(currentMessage_id,friend_id) {
//     try {
//         const Message = await Message.updateOne({_id:currentMessage_id},{$push:{friend:friend_id}})
//         log("updateMessage",Message)

//     } catch (e) {
//         log(e)
//     }
    
// }
async function deletechat(chat_id) {
    try {
        
        await Message.deleteOne({_id:chat_id})
        log("deleted")
    } catch (e) {
        log(e)
    }
    
}


const chat_obj={
    people:[umer,ubaid],
    conversation:[msg_id]
}

async function createChat(chat_obj) {
    try {
        const chat =await Chat.create(chat_obj)
        log("chat",chat)
    } catch (e) {
        log("error",e)
    }
    
}


