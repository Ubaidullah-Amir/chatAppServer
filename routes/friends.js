const express=require("express")
const log=require("../logger")
const router = express.Router()
const {findFriendById,addFriend}=require("../databaseUtils/user")


router.post("/",(req,res)=>{
    try{
        findFriendById(req.body.id)
        .then(friends=>{
            res.json({Success:true,friends:friends})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})

// request object created with between populated with user and friend's id
router.post("/addfriend",(req,res)=>{
    // remove front end note : setting user after this reqeust 
    try{
        const currentUser_id=req.body.currentUser_id
        const friend_id=req.body.friend_id
        
        addFriend(currentUser_id,friend_id)
        .then((req_obj)=>{
            res.json({req_obj:req_obj})
        })
        .catch(e=>{
            res.status(500).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(500).json({error:e.message,Success:false})
    }
})
module.exports=router