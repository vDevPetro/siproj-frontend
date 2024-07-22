import Comentario from "../model/Comentario";
import axios from "axios";
import { getCurrentDateTime } from "../view/pages/historico";

const apiUrl = "https://apisiproj.vercel.app/comentarios";

export const getByAs = async(num_as: String | undefined): Promise<Comentario[]> => {
    try {
        const response = await axios.get<Comentario[]>(`${apiUrl}/${num_as}`);
        return response.data.map(item => ({
            id: item.id,
            comentario: item.comentario,
            data_envio: item.data_envio,
            num_as: item.num_as,
            user: item.user,
            perfil: item.perfil
        }))
    } catch(error) {
        console.error('Falha ao obter dados:', error);
        throw error;
    }
}

export const postComment = async(comentario: Comentario): Promise<{ status: number; data: any}> => {
    try {
        const response = await axios.post(apiUrl, {
            comentario: comentario.comentario,
            user: comentario.user,
            data_envio: comentario.data_envio,
            num_as: comentario.num_as,
            perfil: comentario.perfil
        })
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao enviar o comentario:', error);
        throw error;
    }
}

export const deleteComment = async (comentario: Comentario): Promise<{ status: number; data: any}> => {
    try {
        const response = await axios.delete(`${apiUrl}/${comentario.id}`);
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao deletar comentario:', error);
        throw error;
    }
}

export const updateComment = async(comentario: Comentario, update: string): Promise<{ status: number; data: any}> => {
    try {
        const response = await axios.put(`${apiUrl}/${comentario.id}`, {
            comentario: update,
            data_envio: getCurrentDateTime()
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao atualizar o comentario: ', error);
        throw error;
    }
}