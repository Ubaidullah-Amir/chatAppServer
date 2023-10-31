const express=require("express")
const log=require("../logger")
const router = express.Router()
const {findUserByEmailNPass,createUser,deleteUserById,finduserById, getAllUser,modifyUser}=require("../databaseUtils/user")
const upload = require("../multerConfig")
const { port,hostname } =require("../config")
const domainName = `${hostname}:${port}`
// get a user
router.post("/",(req,res)=>{
    try{
        finduserById(req.body.id)
        .then(user=>{
            res.json({Success:true,user})
            
        })
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})


//post  for login
router.post("/login",(req,res)=>{
    try{
        findUserByEmailNPass(req.body.email,req.body.password)
        .then(user=>{
            if(user){
                res.json({user:user,Success:true,Msg:"User found"})
                return 
            }
            res.status(400).json({user:user,Success:false,Msg:"User not found"})
             
            
        }).catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
    }catch(e){
        // log("login catch error",e)
        res.status(400).json({error:e.message,Success:false})
    }
})

//post for sign up
router.post("/signup",(req,res)=>{
    try{
        createUser(req.body)
        .then(user=>{
            // log("user final",user)
            if(user){
                res.json({user:user,Success:true,Msg:"New User Created"})
                return 
            }
            res.status(400).json({Success:false,Msg:"User Email already exist"})
        })
            
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})
 
// to modifiy user name,password,image
router.post("/modify", upload.single('image'),(req,res)=>{
    try{
        // either get image from req.body(no change) or req.file(modifed image)
        const newValues ={
            id:req.body.id,
            name:req.body.name,
            password:req.body.password,
            image:req.file?`${domainName}/${req.file.filename}`:req.body.image
        }
        modifyUser(newValues)   // id,name,image,password
        .then(upadatedUser=>{
            if(upadatedUser){
                const user={
                    _id:upadatedUser._id,
                    name:upadatedUser.name,
                    email:upadatedUser.email,
                    friend:upadatedUser.friend,
                    image:upadatedUser.image
                    
                }
                res.json({upadatedUser:user,Success:true,Msg:"User Modified"})
                return 
            }
            res.status(400).json({Success:false,Msg:"User Not found"})
        })
            
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})
//Get All Users
router.get("/getusers",(req,res)=>{
    try{
        getAllUser()
        .then(user=>{
            if(user){
                res.json({Success:true,Msg:"User found",user:user})
                return 
            }
            res.status(400).json({Success:false,Msg:"User not found",user:user})
             
            
        }).catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
    }catch(e){
        // log("login catch error",e)
        res.status(400).json({error:e.message,Success:false})
    }
})
// delete a user
router.delete("/delete",(req,res)=>{
    try{
        // log("req.body",req.body)
        deleteUserById(req.body.id)
        .then(status=>{
            if(status.deletedCount==1){
                res.json({Success:true,msg:"User deleted"})
            }else{
                throw new Error("No user deleted")
            }
        })
        .catch(e=>{
            res.status(400).json({error:e.message,Success:false})
        })
        
    }catch(e){
        res.status(400).json({error:e.message,Success:false})
    }
})


module.exports=router