import express from 'express';
import passport from '../config/ldap.js';
import { read, create } from '../config/database.js';
import jwt from 'jsonwebtoken';
import generateHashedPassword from "../hashPassword.js";
import { JWT_SECRET } from '../config/jwt.js';

const router = express.Router();




router.post('/login', (req, res, next) => {
  passport.authenticate('ldapauth', { session: true }, async (err, user, info) => {
    if (err) {
      console.error('Erro na autenticação:', err);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }

    if (!user) {
      console.warn('Falha na autenticação:', info?.message || 'Credenciais inválidas');
      return res.status(401).json({ error: info?.message || 'Autenticação falhou' });
    }

    req.logIn(user, async (loginErr) => {
      if (loginErr) {
        console.error('Erro ao criar sessão:', loginErr);
        return res.status(500).json({ error: 'Erro ao criar sessão' });
      }

      try {
        const password  = req.body.password;
        const passwordHash = await generateHashedPassword(password);

    
        let usuarioExistente = await read('usuarios', `email = '${user.userPrincipalName}'`);
        let userId;
        let funcao;

        if (!usuarioExistente) {
          const novoUsuario = {
            numeroRegistro: isNaN(user.sAMAccountName) ? 0 : parseInt(user.sAMAccountName), // evita erro se vier string
            nome: user.displayName || '',
            email: user.userPrincipalName || user.mail,
            funcao: 'usuario',
            senha: passwordHash,
          };

          userId = await create('usuarios', novoUsuario);
          funcao = novoUsuario.funcao;
          console.log(`Usuário '${user.userPrincipalName}' criado no banco com ID:`, userId);
        } else {
          userId = usuarioExistente.id;
          funcao = usuarioExistente.funcao;
          console.log(`Usuário '${usuarioExistente.nome}' já existe no banco com ID:`, userId);
        }


        const token = jwt.sign(
          {
            id: userId,
            email: user.userPrincipalName ,
            numeroRegistro: user.sAMAccountName,
            nome: user.displayName,
            funcao,
          },
          JWT_SECRET,
          { expiresIn: "12h" }
        );

        return res.json({
          message: 'Autenticado com sucesso',
          usuario: {
            id: userId,
            nome: user.displayName,
            numeroRegistro: user.sAMAccountName,
            email: user.userPrincipalName || user.mail,
            funcao,
          },
          token,
        });
      } catch (dbError) {
        console.error('Erro ao sincronizar usuário com o banco:', dbError);
        return res.status(500).json({ error: 'Erro ao verificar/criar usuário' });
      }
    });
  })(req, res, next);
});

export default router;
