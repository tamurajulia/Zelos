import { listarTecnicos, cadastrarTecnicos, cadastrarTecnico2 } from "../models/pool.js";

const listarTecnicosController = async (req, res) => {
    try {
        const tecnicos = await listarTecnicos()
        res.status(200).json(tecnicos)
    } catch (err) {
        console.error("Erro ao listar tecnicos ", err);
        res.status(500).json({ mensagem: "Erro ao listar tecnicos" });
    }
}

const criarTecnicoController = async (req, res) => {
  try {
    const id = req.params.id;
    const { id_pool } = req.body;

    const tecnicoData = {
      id_tecnico: id,           // ✅ campo correto
      id_pool: id_pool,
    };

    const tecnicoData2 = {
      funcao: 'tecnico'
    };

    // Atualiza função do usuário para "tecnico"
    await cadastrarTecnico2(id, tecnicoData2);

    // Insere na tabela pool_tecnico
    const tecnicoId = await cadastrarTecnicos(tecnicoData);

    res.status(201).json({ mensagem: 'Técnico cadastrado com sucesso', tecnicoId });
  } catch (error) {
    console.error('Erro ao cadastrar tecnico:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar tecnico' });
  }
};









export { listarTecnicosController, criarTecnicoController }