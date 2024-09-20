import Indicador from "../model/Indicador";
import axios from "axios";
import { apiKey } from "./ConnectionFactory";

const apiUrl = "https://apisiproj.vercel.app/indicadores";

export const getIndicadores = async (num_as: string | undefined) => {
    try {
        const response = await axios.get<Indicador>(`${apiUrl}/curvas/${num_as}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            return { status: 400, data: {} as Indicador};
        } else {
            console.error('Falha em obter os dados:', error);
            throw error;
        }
    }
}