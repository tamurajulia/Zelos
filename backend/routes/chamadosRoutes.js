import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { criarChamadoController, chamdosUsuarioController, obterChamadoPorIdController, chamadosAreaTecnicoController, atribuirChamadoTecnicoController, listarChamadosAndamentoTecnicoController,listarChamadosConcluidoTecnicoController, concluirChamadoTecnicoController } from '../controllers/chamadosController.js';

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


router.post('/', authMiddleware, upload.array('arquivos', 10), criarChamadoController);

// rotas para usuários :)
router.get('/meusChamadosUsuario/:id', authMiddleware, obterChamadoPorIdController);
router.get('/meusChamadosUsuario', authMiddleware, chamdosUsuarioController);

// rota para técnicos :)
router.get('/areaTecnico', authMiddleware, chamadosAreaTecnicoController);
router.get('/chamadosAndamentoTecnico', authMiddleware, listarChamadosAndamentoTecnicoController)
router.get('/chamadosConcluidoTecnico', authMiddleware, listarChamadosConcluidoTecnicoController)
router.put('/atribuirChamado/:id', authMiddleware, atribuirChamadoTecnicoController)
router.put('/concluirChamado/:id', authMiddleware, concluirChamadoTecnicoController)


// rota por ID - DEVE vir por último
router.get('/:id', authMiddleware, obterChamadoPorIdController);









router.options('/meusChamadosUsuario', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})
router.options('/meusChamadosUsuario/:id', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST ,OPTIONS');
    res.status(204).send();
})

router.options('/chamadosTecnicos', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})





export default router;