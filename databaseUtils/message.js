const log=require("../logger")
const mongoose=require("../mongooseConnect")
const Message=require("../Schemas/message")





// create a msg 
async function createMsg(msg_obj) {
    try {
        const msg=await Message.create(msg_obj)
        return msg
    } catch (e) {
        log(e)
    }
}
// find  a msg using msg_id
async function findMsg(msg_id) {
    try {
        const msg=await Message.findOne({_id:msg_id}).populate("to").populate("from").limit(1)
        return msg
    } catch (e) {
        log("error",e)
    }
    
}
// delete  a msg using msg_id
async function deleteMsg(msg_id) {
    try {
        const msg=await Message.deleteOne({_id:msg_id})
        return msg
    } catch (e) {
        log("error",e)
    }
    
}
module.exports={createMsg,findMsg,deleteMsg}





