import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Formato do token inválido' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.usuario = {
      id: decoded.id,
      nome: decoded.nome,
      numeroRegistro: decoded.numeroRegistro,
      funcao: decoded.funcao,
      email: decoded.email
    };

    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
};


export default authMiddleware