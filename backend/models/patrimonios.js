import { create, readAll, read } from '../config/database.js';


const listarPatrimoniosUsuario = async (id) => {
  try {
    return await readAll('equipamentos')
  } catch (err) {
    console.error('Erro ao listar livros: ', err)
    throw err
  }
};


export {listarPatrimoniosUsuario}