import { listarPatrimoniosUsuario } from "../models/patrimonios.js";


const listarPatrimoniosController = async (req, res ) =>{
    try{
        const patrimonios = await listarPatrimoniosUsuario()
        res.json(patrimonios)
    }catch(error){
    console.error('Erro ao listar patrimonios: ', err)
    res.status(500).json({ mensagem: 'Erro ao listar patrimonios' })
    }
}

export{listarPatrimoniosController}