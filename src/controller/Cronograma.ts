import axios from "axios";
import Cronograma from "../model/Cronograma";
import { getCurrentDateTime } from "../view/pages/historico";
import { apiKey } from "./ConnectionFactory";

const apiUrl = "https://apisiproj.vercel.app/cronograma";

export const updateCronograma = async (num_as: string, url: string, user: string | undefined): Promise<{status: number; data: any}> => {
    try {
        const response = await axios.put(`${apiUrl}/${num_as}`, 
        {
            url: url,
            log: 'Cronograma enviado em: ' + getCurrentDateTime() + ' por ' + user
        },
        {
            headers: {
                Authorization: apiKey,
            }
        });
        return {status: response.status, data: response.data}
    } catch (error) {
        console.error('Falha ao atualizar o cronograma:', error);
        throw error;
    }
}

export const getCronogramaByAs = async (num_as: string): Promise<Cronograma[] | null> => {
    try {
        const response = await axios.get<Cronograma[]>(`${apiUrl}/${num_as}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        return response.data.map(item => ({
            ...item
        }))
    } catch(error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        console.error('Falha ao obter dados:', error);
        throw error;
    }
}

export const postCronograma = async (num_as: string): Promise<{status: number; data: any}> => {
    try {
        const res = await axios.post(apiUrl, 
        {
            num_as: num_as
        },
        {
            headers: {
                Authorization: apiKey,
            }
        });
        return { status: res.status, data: res.data };
    } catch (error) {
        console.error('Falha ao adicionar cronograma:', error);
        throw error;
    }  
}