import {
  listarChamadosNaoAtribuidos,
  listarChamadosAndamento,
  listarChamadosConcluidos, 
  listarGrauPrioridade
} from '../models/dashboardAdmin.js';


const listarChamadosConcluidosController = async (req, res) => {
    try {
        const chamadosConcluidos = await listarChamadosConcluidos()
        res.status(200).json(chamadosConcluidos)
    } catch (err) {
        console.error("Erro ao listar chamados Concluídos Dashboard: ", err);
        res.status(500).json({ mensagem: "Erro ao listar chamados Concluídos Dashboard:" });
    }
}

const listarChamadosNaoAtribuidosController = async (req, res) => {
    try {
        const chamadosNaoAtribuidos = await listarChamadosNaoAtribuidos()
        res.status(200).json(chamadosNaoAtribuidos)
    } catch (err) {
        console.error("Erro ao listar chamados não atribuídos Dashboard: ", err);
        res.status(500).json({ mensagem: "Erro ao listar chamados não atribuídos Dashboard:" });
    }
}

const listarChamadosAndamentoController = async (req, res) => {
    try {
        const chamadosAndamento = await listarChamadosAndamento()
        res.status(200).json(chamadosAndamento)
    } catch (err) {
        console.error("Erro ao listar chamados em andamento Dashboard: ", err);
        res.status(500).json({ mensagem: "Erro ao listar chamados em andamento Dashboard:" });
    }
}



const listarChamadosPorGrauPriodade = async (req, res) => {
  try {
    const { grauPrioridade } = req.query; 

    let chamados;
    if (grauPrioridade) {
      chamados = await listarGrauPrioridade(grauPrioridade);
    } else {
      chamados = await listarGrauPrioridade();
    }
    res.status(200).json(chamados);
  } catch (err) {
    console.error(`Erro ao listar chamados pelo grau prioridade: `, err);
    res.status(500).json({ mensagem: 'Erro ao listar chamados pelo grau prioridade' });
  }
};

export {
    listarChamadosAndamentoController,
    listarChamadosNaoAtribuidosController,
    listarChamadosConcluidosController,
    listarChamadosPorGrauPriodade
}
