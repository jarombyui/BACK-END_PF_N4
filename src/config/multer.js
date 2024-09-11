import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './images';

        // Verifica si la carpeta existe; si no, la crea
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const name = file.originalname;
        cb(null, name);
    }
});

const filterImg = (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype === 'image/jpeg' || mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Solo se aceptan imágenes'));
    }
};

export const upload = multer({ storage, fileFilter: filterImg });
