import multer from "multer";
import { __dirname } from '../utils.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = '';

        if (file.fieldname === 'identification') {
            uploadPath = `${__dirname}/public/uploads/identification/`;
        } else if (file.fieldname === 'address') {
            uploadPath = `${__dirname}/public/uploads/address/`;
        } else if (file.fieldname === 'account-status') {
            uploadPath = `${__dirname}/public/uploads/account-status/`;
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split('.').slice(0, -1).join('.');
        cb(null, `${Date.now()}-${file.fieldname}-${fileName}`)
    }
});

const upload = multer({ storage });

export {
    upload
}