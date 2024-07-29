import axios from "axios";
import Cronograma from "../model/Cronograma";

const apiUrl = "https://apisiproj.vercel.app/cronograma";

export const updateUrl = async (num_as: string, url: string): Promise<{status: number; data: any}> => {
    try {
        const response = await axios.put(`${apiUrl}/${num_as}/url`, {
            url: url
        });
        return { status: response.status, data: response.data }
    } catch (error) {
        console.error('Falha ao atualizar url do cronograma:', error);
        throw error;
    }
}

export const getCronogramaByAs = async (num_as: string): Promise<Cronograma[] | null> => {
    try {
        const response = await axios.get<Cronograma[]>(`${apiUrl}/${num_as}`);
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