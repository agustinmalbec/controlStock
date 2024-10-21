import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/files';
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let name = file.originalname;
        cb(null, name);
    }
});

export const upload = multer({ storage: storage });

