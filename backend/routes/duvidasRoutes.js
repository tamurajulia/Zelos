import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import {criarDuvidaController, listarDuvidaController} from '../controllers/duvidaController.js'
const router = express.Router();


router.get('/', authMiddleware, listarDuvidaController)


router.post('/', authMiddleware, criarDuvidaController)



router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
})

export default router