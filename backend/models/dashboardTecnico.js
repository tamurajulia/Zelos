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



const listarChamadosAndamentoTecnico = async (id) => {
  try {
    return await readAll('chamados', `tecnico_id = ${id} and status = 'em andamento'`);
  } catch (err) {
    console.error('Erro ao listar chamados: ', err);
    throw err;
  }
};




const listarChamadosConcluidoTecnico = async (id) => {
  try {
    return await readAll('chamados', `tecnico_id = ${id} and status = 'concluido'`);
  } catch (err) {
    console.error('Erro ao listar chamados: ', err);
    throw err;
  }
};










export {listarChamadosConcluidos, listarChamadosAndamento, listarChamadosNaoAtribuidos, listarChamadosAndamentoTecnico, listarChamadosConcluidoTecnico}