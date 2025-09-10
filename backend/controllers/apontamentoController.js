import { criarApontamento, obterApontamentoId } from "../models/apontamentos.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const criarApontamentoController = async (req, res) => {
    try {
        const tecnicoId = req.usuario.id;
        const chamado = req.params.id;
        const { descricao, pecasUtilizadas } = req.body;

        let arquivos = null;
        if (req.files && req.files.length > 0) {
            arquivos = req.files
                .map(file => file.path.replace(__dirname.replace("\\controllers", ""), ""))
                .join(",");
        }

        const apontamentoData = {
            chamado_id: chamado,
            tecnico_id: tecnicoId,
            descricao,
            pecasUtilizadas,
            arquivos,
        };


        const apontamentoId = await criarApontamento(apontamentoData);

        res.status(201).json({ mensagem: 'Apontamento criado com sucesso', apontamentoId });
    } catch (error) {
        console.error('Erro ao criar Apontamento:', error);
        res.status(500).json({ mensagem: 'Erro ao criar Apontamento' });
    }
};

const obterApontamentoIdControoler = async (req, res) => {
    try {
        const apontamento = await obterApontamentoId(req.params.id)
        if (apontamento) {
            res.status(200).json(apontamento)
        } else {
            res.status(404).json({ mensagem: "apontamento não encontrado" })
        }
    } catch (err) {
        console.error('Erro ao obter Apontamento por id:', error);
        res.status(500).json({ mensagem: 'Erro ao obter Apontamento por id' });
    }
}

export { criarApontamentoController, obterApontamentoIdControoler };
