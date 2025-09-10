import { obterUsuarioId, listarUsuarios } from "../models/usuarios.js";


const obterUsuarioIdController = async (req, res) => {
    try {
        const usuarioId = await obterUsuarioId(req.params.id)
        if (usuarioId) {
            res.status(200).json(usuarioId);
        } else {
            res.status(404).json({ mensagem: "usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao obter usuário por ID: ", err);
        res.status(500).json({ mensagem: "Erro ao obter usuário por ID" });
    }
}


const listarUsuariosController = async (req, res) => {
    try {
        const usuarios = await listarUsuarios()
        res.status(200).json(usuarios);

    } catch (error) {
        console.error("Erro ao listar usuários ", err);
        res.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
}


export { obterUsuarioIdController, listarUsuariosController }