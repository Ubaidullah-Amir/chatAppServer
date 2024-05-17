const multer = require('multer');

const FireBaseUpload = multer({
    storage : multer.memoryStorage()
})

module.exports = {FireBaseUpload};