const express = require("express")
const log = require("../logger")
const router = express.Router()
const { getAllRequests, requestAccepted } = require("../databaseUtils/request")


router.post("/getrequests", (req, res) => {
    try {
        getAllRequests(req.body.id)
            .then(request => {
                res.json({ Success: true, request: request })
            })
            .catch(e => {
                res.status(500).json({ error: e.message, Success: false })
            })

    } catch (e) {
        res.status(500).json({ error: e.message, Success: false })
    }
})

// add friend's id by user's id 
router.post("/requestapproved", (req, res) => {
    try {
        const currentUser_id = req.body.currentUser_id
        const friend_id = req.body.friend_id

        requestAccepted(currentUser_id, friend_id)
            .then(({person_id,user}) => {
                res.json({ Success: true, user:user ,person_id:person_id})
            })
            .catch(e => {
                res.status(500).json({ error: e.message, Success: false })
            })

    } catch (e) {
        res.status(500).json({ error: e.message, Success: false })
    }
})
module.exports = router