import {readAll, create} from '../config/database.js'


const criarDuvida = async (duvidaData) => {
    try {
        return await create('duvidas', duvidaData);
    } catch (error) {
        console.error('Erro ao criar Duvida:', error);
        throw error;
    }
};

const listarDuvidas = async () => {
    try {
        return await readAll('duvidas')
    } catch (err) {
        console.error('Erro ao listar duvidas: ', err)
        throw err
    }
};



export{criarDuvida, listarDuvidas}