import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { criarApontamentoController, obterApontamentoIdControoler } from '../controllers/apontamentoController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
const upload = multer({ storage: storage });


const router = express.Router();



router.get('/:id', authMiddleware, obterApontamentoIdControoler);
router.post('/:id', authMiddleware, upload.array('arquivos', 10), criarApontamentoController);




export default router