import { create, readAll, read, update } from '../config/database.js';

const criarChamado = async (chamadoData) => {
  try {
    return await create('chamados', chamadoData);
  } catch (error) {
    console.error('Erro ao criar chamados:', error);
    throw error;
  }
};

const obterChamadoId = async (id) => {
  try {
    return await read('chamados', `id = ${id}`)
  } catch (err) {
    console.error('Erro ao obter livro por ID: ', err)
    throw err;
  }
}


const listarChamadosUsuario = async (id) => {
  try {
    return await readAll('chamados', `usuario_id = ${id}`)
  } catch (err) {
    console.error('Erro ao listar chamados do usuário: ', err)
    throw err
  }
};



const listarChamadosArea = async (areaTecnico) => {
  try {
    return await readAll('chamados', `tipo_id= ${areaTecnico} AND tecnico_id IS NULL`);
  } catch (err) {
    console.error('Erro ao listar chamados: ', err);
    throw err;
  }
};

const tecnicoPool = async (idTecnico) => {
  try {
    return await readAll('pool_tecnico', `id_tecnico = ${idTecnico}`)
  } catch (err) {
    console.error('Erro ao encontrar o pool do tecnico: ', err);
    throw err;
  }
}


const atribuicaoChamadosTecnico = async (id, chamadoData) => {
  try {
    await update('chamados', chamadoData, `id = ${id}`);
  } catch (error) {
    console.error('Erro ao atribuir chamado: ', error);
    throw error;
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


const concluirChamadoTecnico = async (id, chamadoData) => {
  try {
    await update('chamados', chamadoData, `id = ${id}`);
  } catch (error) {
    console.error('Erro ao atribuir chamado: ', error);
    throw error;
  }
};






export {
  criarChamado,
  listarChamadosUsuario,
  obterChamadoId,
  atribuicaoChamadosTecnico,
  tecnicoPool,
  listarChamadosArea,
  listarChamadosAndamentoTecnico,
  listarChamadosConcluidoTecnico, 
  concluirChamadoTecnico
};
