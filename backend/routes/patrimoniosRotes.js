import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { listarPatrimoniosController } from '../controllers/PatrimoniosController.js';
const router = express.Router();


router.get('/', authMiddleware, listarPatrimoniosController)


export default router