const multer = require("multer");
const path = require("path");
const VALID_FILE_TYPES = ["image/png", "image/jpg"];


const storage = multer.diskStorage(
    {
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        },
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../public/uploads"));
        }
    }
);

const upload = multer(
    {
        storage: multer.diskStorage(
            {
                filename: (req, file, cb) => {
                    cb(null, Date.now() + file.originalname);
                },
                destination: (req, file, cb) => {
                    cb(null, path.join(__dirname, "../public/uploads"));
                }
            }
        ), 
        fileFilter: (req, file, cb) => {
            if(!VALID_FILE_TYPES.includes(file.mimetype)){
                cb(new Error("INvalid file type"));
            } else {
                cb(null, true);
            }
        }
    }
);
module.exports = {upload};