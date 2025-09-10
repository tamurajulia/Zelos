import { criarChamado, listarChamadosUsuario, obterChamadoId, listarChamadosArea, tecnicoPool, atribuicaoChamadosTecnico, listarChamadosAndamentoTecnico,listarChamadosConcluidoTecnico, concluirChamadoTecnico } from "../models/chamados.js";
import { fileURLToPath } from "url";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const criarChamadoController = async (req, res) => {
  try {
    const usuario = req.usuario.id;
    const { titulo, tipoChamado, patrimonio, localizacao, prioridade, descricao } = req.body;

    let arquivos = null;
    if (req.files && req.files.length > 0) {
      arquivos = req.files
        .map(file => file.path.replace(__dirname.replace("\\controllers", ""), ""))
        .join(",");
    }

    const chamadoData = {
      titulo,
      tipo_id: tipoChamado,
      patrimonio,
      localizacao,
      grauPrioridade: prioridade,
      usuario_id: usuario,
      descricao,
      arquivos,
    };

    const chamadoId = await criarChamado(chamadoData);
    res.status(201).json({
      mensagem:
        "Seu chamado foi registrado, aguarde que um técnico responsável irá resolver",
      chamadoId,
    });
  } catch (error) {
    console.error("Erro ao criar chamado:", error);
    res.status(500).json({ mensagem: "Erro ao criar chamado" });
  }
};

const obterChamadoPorIdController = async (req, res) => {
  try {
    const chamado = await obterChamadoId(req.params.id);
    if (chamado) {
      res.status(200).json(chamado);
    } else {
      res.status(404).json({ mensagem: "Chamado não encontrado" });
    }
  } catch (err) {
    console.error("Erro ao obter chamado por ID: ", err);
    res.status(500).json({ mensagem: "Erro ao obter chamado por ID" });
  }
};

const chamdosUsuarioController = async (req, res) => {
  try {
    const usuario = req.usuario.id;
    const chamadosUsuario = await listarChamadosUsuario(usuario);
    res.status(200).json(chamadosUsuario);
  } catch (err) {
    console.error("Erro ao listar chamados do usuário: ", err);
    res.status(500).json({ mensagem: "Erro ao listar chamados do usuário" });
  }
};




const chamadosAreaTecnicoController = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const resultado = await tecnicoPool(usuarioId);

    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ mensagem: "Técnico não possui área associada." });
    }


    const [{ id_pool: areaTecnico }] = resultado;

    const chamadosArea = await listarChamadosArea(areaTecnico);

    return res.status(200).json(chamadosArea);
  } catch (err) {
    console.error("Erro ao obter área do técnico:", err);
    return res.status(500).json({ mensagem: "Erro ao obter área do técnico" });
  }
};


const atribuirChamadoTecnicoController = async (req, res) => {
  try {
    const chamado = req.params.id;
    const tecnico = req.usuario.id;

    const data = {
      tecnico_id: tecnico,
      status: 'em andamento'
    };

    await atribuicaoChamadosTecnico(chamado, data);
    res.status(200).json({ mensagem: 'Chamado atribuído com sucesso.' });
  } catch (error) {
    console.error('Erro ao atribuir chamado:', error);
    res.status(500).json({ mensagem: 'Erro ao atribuir chamado' });
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


const concluirChamadoTecnicoController = async (req, res) => {
  try {
    const chamado = req.params.id;

    const data = {
      status: 'concluido'
    };

    await concluirChamadoTecnico(chamado, data);
    res.status(200).json({ mensagem: 'Chamado concluido com sucesso.' });
  } catch (error) {
    console.error('Erro ao concluido chamado:', error);
    res.status(500).json({ mensagem: 'Erro ao concluido chamado' });
  }
}




export { criarChamadoController, chamdosUsuarioController, obterChamadoPorIdController, chamadosAreaTecnicoController, atribuirChamadoTecnicoController, listarChamadosAndamentoTecnico, listarChamadosAndamentoTecnicoController, listarChamadosConcluidoTecnicoController, concluirChamadoTecnicoController};
