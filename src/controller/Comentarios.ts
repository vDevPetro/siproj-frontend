import Comentario from "../model/Comentario";
import axios from "axios";

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