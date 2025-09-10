import { where } from "sequelize";
import { readAll } from "../config/database.js";



const listarChamadosAndamento = async () => {
  try {
    return await readAll('chamados', `status = 'em andamento'`);
  } catch (err) {
    console.error('Erro ao listar chamados em andamentos: ', err);
    throw err;
  }
};


const listarChamadosConcluidos = async () => {
  try {
    return await readAll('chamados', `status = 'concluido'`);
  } catch (err) {
    console.error('Erro ao listar chamados concluídos: ', err);
    throw err;
  }
};

const listarChamadosNaoAtribuidos = async () => {
  try {
    return await readAll('chamados', `status = 'pendente'`);
  } catch (err) {
    console.error('Erro ao listar chamados não atribuidos: ', err);
    throw err;
  }
};




const listarGrauPrioridade = async (grauPrioridade) => {
  try {

    let whereClause = ''
    if (grauPrioridade) {
      whereClause = `grauPrioridade = '${grauPrioridade}'`;
    }

    return await readAll('chamados', whereClause);
  } catch (error) {
    console.error('Erro ao obter consultas:', error);
    throw error;
  }
};









export {listarChamadosConcluidos, listarChamadosAndamento, listarChamadosNaoAtribuidos, listarGrauPrioridade}