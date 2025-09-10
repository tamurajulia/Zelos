import {read, readAll} from '../config/database.js'


const listarUsuarios = async () => {
  try {
    return await readAll('usuarios')
  } catch (err) {
    console.error('Erro ao listar Usuários: ', err)
    throw err
  }
};

const obterUsuarioId = async (id) =>{
try{
return await read('usuarios', `id = ${id}`)
}catch(err){
console.error('Erro ao obter Usuário: ', err)
throw err
}
}


export{obterUsuarioId, listarUsuarios}