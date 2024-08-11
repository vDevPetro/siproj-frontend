import Indicador from "../model/Indicador";
import axios from "axios";

const apiUrl = "https://apisiproj.vercel.app/indicadores";

export const getIndicadores = async (num_as: string | undefined): Promise<Indicador> => {
    try {
        const response = await axios.get<Indicador>(`${apiUrl}/curvas/${num_as}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return <Indicador>{};
        } else {
            console.error('Falha em obter os dados:', error);
            throw error;
        }
    }
}