const express=require("express")
const log=require("../logger")
const router = express.Router()
const {findchat,deletechat, addMsgToChat, createChat, findchatByID}=require("../databaseUtils/chat")
// get the chat by ID testing purpose 

router.post("/findchat",(req,res)=>{
    try{
        findchatByID(req.body.id)
        .then(chat=>{
            // log("chdlfkat",chat)
            res.json({Success:true,chat:chat})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})


// getting chat using userID and FriendsID
router.post("/",(req,res)=>{
    try{
        findchat(req.body.user_id,req.body.friend_id)
        .then(chat=>{
            res.json({Success:true,chat:chat})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})

router.post("/deleteConversation",(req,res)=>{
    try{
        deletechat(req.body.id)
        .then(()=>{
            res.json({Success:true,msg:"Conversation deleted"})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
// no route needed
//  create chat of two people with empty conversation
router.post("/createchat",(req,res)=>{
    try{
        // log("req.body",req.body)
        createChat(req.body.id,req.body.chat_obj)
        .then(status=>{
            // log(status)
            res.json({Success:true,chat:chat,msg:"chat is created"})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
// adds msg to chat
router.post("/add_msg",(req,res)=>{
    try{
        // log("req.body",req.body)
        addMsgToChat(req.body.chat_id,req.body.msg_obj)
        .then(status=>{
            res.json({Success:true,msg:"message added"})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
module.exports=router