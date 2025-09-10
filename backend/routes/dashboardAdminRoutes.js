import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import { listarChamadosAndamentoController, listarChamadosConcluidosController, listarChamadosNaoAtribuidosController, listarChamadosPorGrauPriodade } from '../controllers/dashboardAdminController.js';



const router = express.Router();



router.get('/concluido', authMiddleware, listarChamadosConcluidosController)
router.get('/naoAtribuido', authMiddleware, listarChamadosNaoAtribuidosController)
router.get('/andamento', authMiddleware, listarChamadosAndamentoController)

router.get('/grauPrioridade', authMiddleware, listarChamadosPorGrauPriodade)

export default router