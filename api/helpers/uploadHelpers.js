const multer = require('multer')

/*


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log('req.files multer destination', req.files)
        console.log('file multer destination', file)
        callback(null, 'public/uploads/')
    },
    filename: function (req, file, callback) {
        console.log('req.files multer filename', req.files)
        console.log('file multer filename', file)
        callback(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage })

module.exports = upload


*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.includes('video')) {
            cb(null, 'public/video/')
        }

        if (file.mimetype.includes('image')) {
            cb(null, 'public/img/')
        }

        if (!file.mimetype.includes('video') || !file.mimetype.includes('image')) {
            cb(null, 'public/uploads/')
        }
        
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
