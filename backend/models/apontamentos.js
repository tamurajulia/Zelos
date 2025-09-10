import { create, read
 } from '../config/database.js'


const criarApontamento = async (chamadoData) => {
  try {
    return await create('apontamentos', chamadoData);
  } catch (error) {
    console.error('Erro ao criar apontamento:', error);
    throw error;
  }
};
const obterApontamentoId = async (id) => {
  try {
    return await read('apontamentos', `chamado_id = '${id}'`);
  } catch (error) {
    console.error('Erro ao obter id apontamento:', error);
    throw error;
  }
}

export { criarApontamento,obterApontamentoId }