import { listarDuvidas, criarDuvida } from '../models/duvidas.js'

const criarDuvidaController = async (req, res) => {
  try {
    const usuarioNome = req.usuario.nome
    const { titulo, descricao, email } = req.body 
    
    const duvidaData = {
      titulo,
      descricao,
      usuario: usuarioNome,
      email
    }

    const duvidaId = await criarDuvida(duvidaData)
    res.status(201).json({ mensagem: 'Duvida criada com sucesso', duvidaId })
  } catch (error) {
    console.error('Erro ao criar Duvida:', error)
    res.status(500).json({ mensagem: 'Erro ao criar Duvida' })
  }
}

const listarDuvidaController = async (req, res) => {
  try {
    const duvidas = await listarDuvidas()
    res.status(200).json(duvidas)
  } catch (err) {
    console.error('Erro ao listar duvidas: ', err)
    res.status(500).json({ mensagem: 'Erro ao listar duvidas' })
  }
}

export { criarDuvidaController, listarDuvidaController }