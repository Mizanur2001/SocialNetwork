import multer from 'multer'

const maxSize = 15 * 1024 * 1024

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/image")
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true)
        }
        else {
            callback(null, false)
        }
    },
    limits: { fileSize: maxSize }
})

export default upload