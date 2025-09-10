import { readAll, create, update } from "../config/database.js";

const listarTecnicos = async () => {
  try {
    return await readAll('pool_tecnico')
  } catch (err) {
    console.error('Erro ao listar Tecnicos: ', err)
    throw err
  }
};



const cadastrarTecnicos = async (tecnicoData) => {
  try {
    return await create('pool_tecnico', tecnicoData)
  } catch (err) {
    console.error('Erro ao cadastrar técnico: ', err)
    throw err
  }
};


const cadastrarTecnico2 = async (id, funcaoUsuario) => {
  try {
    await update('usuarios', funcaoUsuario, `id = ${id}`);
  } catch (error) {
    console.error('Erro ao alterar funcao usuario: ', error);
    throw error;
  }
};





export { listarTecnicos, cadastrarTecnicos, cadastrarTecnico2 }