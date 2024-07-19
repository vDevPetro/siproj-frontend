import axios from "axios";
import Usuario from "../model/Usuario";

const apiUrl = "https://apisiproj.vercel.app/users";

export const getUsers = async (): Promise<Usuario[]> => {
    try {
        const response = await axios.get<Usuario[]>(apiUrl);
        return response.data.map(item => ({
            id: item.id,
            nome: item.nome,
            email: item.email,
            nivel: item.nivel,
            status: item.status,
            uid: item.uid,
            stamp: item.stamp,
            profilePhoto: item.profilePhoto
        }));
    } catch(error) {
        console.error('Falha em obter os usuários: ', error);
        throw error;
    }
}

export const getUser = async(email: string): Promise<Usuario> => {
    try {
        const response = await axios.get<Usuario>(`${apiUrl}/${email}`);
        const item = response.data;
        return {
            id: item.id,
            nome: item.nome,
            email: item.email,
            nivel: item.nivel,
            status: item.status,
            uid: item.uid,
            stamp: item.stamp,
            profilePhoto: item.profilePhoto
        }
    } catch(error) {
        console.error('Falhar em obter usuário: ', error);
        throw error;
    }
}

export const updateUsers = async() => {
    try{
        const response = await axios.get(apiUrl+'/export-users');
        return response.status;
    } catch(error) {
        console.error('Falha em atualizar usuarios: ', error);
        throw error;
    }
}