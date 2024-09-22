import Comentario from "../model/Comentario";
import axios from "axios";
import { getCurrentDateTime } from "../view/pages/historico";
import { apiKey } from "./ConnectionFactory";

const apiUrl = "https://apisiproj.vercel.app/comentarios";

export const getByAs = async(num_as: String | undefined): Promise<Comentario[]> => {
    try {
        const response = await axios.get<Comentario[]>(`${apiUrl}/${num_as}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        return response.data.map(item => ({
            id: item.id,
            comentario: item.comentario,
            data_envio: item.data_envio,
            num_as: item.num_as,
            user: item.user,
            perfil: item.perfil,
            nome: item.nome
        }));
    } catch(error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return [];
        }
        console.error('Falha ao obter dados:', error);
        throw error;
    }
}

export const postComment = async(comentario: Comentario): Promise<{ status: number; data: any}> => {
    try {
        const response = await axios.post(apiUrl, {
            headers: {
                Authorization: apiKey,
            },
            comentario: comentario.comentario,
            user: comentario.user,
            data_envio: comentario.data_envio,
            num_as: comentario.num_as,
            perfil: comentario.perfil,
            nome: comentario.nome
        })
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao enviar o comentario:', error);
        throw error;
    }
}

export const deleteComment = async (comentario: Comentario): Promise<{ status: number; data: any}> => {
    try {
        const response = await axios.delete(`${apiUrl}/${comentario.id}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao deletar comentario:', error);
        throw error;
    }
}

export const updateComment = async(comentario: Comentario, update: string): Promise<{ status: number; data: any}> => {
    try {
        const response = await axios.put(`${apiUrl}/${comentario.id}`, {
            headers: {
                Authorization: apiKey,
            },
            comentario: update,
            data_envio: getCurrentDateTime()
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao atualizar o comentario: ', error);
        throw error;
    }
}