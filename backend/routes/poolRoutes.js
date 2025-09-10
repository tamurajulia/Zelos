import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { listarTecnicosController,criarTecnicoController } from '../controllers/poolTecnicoController.js';
const router = express.Router();


router.get('/tecnicos', authMiddleware, listarTecnicosController)
router.post('/cadastrarTecnicos/:id', authMiddleware, criarTecnicoController)


export default router