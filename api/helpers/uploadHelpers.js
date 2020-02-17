const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname, fieldname } = file

        const originalnameParts = originalname.split('.')

        cb(
            null,
            fieldname +
        '-' +
        originalnameParts[0] +
        '-' +
        new Date().toISOString() +
        `.${originalnameParts[originalnameParts.length - 1]}`
        )
    }
})

const upload = multer({
    storage
})

module.exports = upload
