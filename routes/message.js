const express=require("express")
const log=require("../logger")
const router = express.Router()
const { createMsg,findMsg,deleteMsg }=require("../databaseUtils/message")


router.post("/",(req,res)=>{
    try{ 
        // findchat(req.body.user_id,req.body.friend_id)
        findMsg(req.body.id)
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

router.delete("/delete",(req,res)=>{
    try{
        deleteMsg(req.body.id)
        .then(status=>{
            if(status.deletedCount==1){
                res.json({Success:true,msg:"User deleted"})
            }else{
                throw new Error("No user deleted")
            }
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
// needs work
router.post("/create",(req,res)=>{
    try{
        createMsg(req.body.msg_obj)
        .then(status=>{
            res.json({Success:true,status})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
module.exports=router