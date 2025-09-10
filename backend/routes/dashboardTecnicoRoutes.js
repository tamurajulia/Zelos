import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import { listarChamadosAndamentoController, listarChamadosConcluidosController, listarChamadosNaoAtribuidosController,listarChamadosAndamentoTecnicoController,listarChamadosConcluidoTecnicoController } from '../controllers/dashboardTecnicoController.js';



const router = express.Router();



router.get('/concluido', authMiddleware, listarChamadosConcluidosController)
router.get('/naoAtribuido', authMiddleware, listarChamadosNaoAtribuidosController)
router.get('/andamento', authMiddleware, listarChamadosAndamentoController)



router.get('/andamentoTecnico', authMiddleware, listarChamadosAndamentoTecnicoController)
router.get('/concluidoTecnico', authMiddleware, listarChamadosConcluidoTecnicoController)




export default router