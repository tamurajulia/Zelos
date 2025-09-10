import {
  listarChamadosNaoAtribuidos,
  listarChamadosAndamento,
  listarChamadosConcluidos,
  listarChamadosAndamentoTecnico, 
  listarChamadosConcluidoTecnico

} from '../models/dashboardTecnico.js';


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



const listarChamadosAndamentoTecnicoController = async (req, res) => {
  try {
    const tecnico = req.usuario.id
    const chamadosUsuario = await listarChamadosAndamentoTecnico(tecnico);
    res.status(200).json(chamadosUsuario);
  } catch {
    console.error("Erro ao listar chamados do tecnico que estão em andamento: ", err);
    res.status(500).json({ mensagem: "Erro ao listar chamados do tecnico que estão em andamento" });
  }
}



const listarChamadosConcluidoTecnicoController = async (req, res) => {
  try {
    const tecnico = req.usuario.id
    const chamadosUsuario = await listarChamadosConcluidoTecnico(tecnico);
    res.status(200).json(chamadosUsuario);
  } catch {
    console.error("Erro ao listar chamados do tecnico que estão concluido: ", err);
    res.status(500).json({ mensagem: "Erro ao listar chamados do tecnico que estão concluido" });
  }
}





export {
    listarChamadosAndamentoTecnicoController,
    listarChamadosAndamentoController,
    listarChamadosNaoAtribuidosController,
    listarChamadosConcluidosController,
    listarChamadosConcluidoTecnicoController

}
