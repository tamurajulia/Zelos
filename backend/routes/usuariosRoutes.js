import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { obterUsuarioIdController, listarUsuariosController } from '../controllers/usuariosController.js';
const router = express.Router();

router.get('/', authMiddleware, listarUsuariosController)
router.get('/:id', authMiddleware, obterUsuarioIdController)



router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET ,OPTIONS');
    res.status(204).send();
})


export default router