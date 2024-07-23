import Emissao from "../model/Emissao";
import axios from "axios";

const apiUrl = "https://apisiproj.vercel.app/emissao";

export const getEmissao = async (num_as:string | undefined): Promise<Emissao[]> => {
  try {
      const response = await axios.get<Emissao[]>(`${apiUrl}/${num_as}`);
      return response.data.map(item => ({
        id: item.id,
        num_as: item.num_as,
        emissao: Number(item.emissao),
        motivo: item.motivo,
        emitir_projeto_lb: item.emitir_projeto_lb,
        comentar_projeto_lb: item.comentar_projeto_lb,
      }));
  } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
          return [];
      } else {
          console.error('Falha em obter os dados:', error);
          throw error;
      }
  }
};

export const postEmissao = async (emissao: Emissao): Promise<{ status: number; data: any }> => {
  try {
    const response = await axios.post(apiUrl, emissao);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Falha ao enviar os dados:', error);
    throw error;
  }
};

export const getNextAvailableId = async (): Promise<number> => {
  try {
      const response = await axios.get<{ nextId: number }>(`${apiUrl}/nextid`);
      return response.data.nextId;
  } catch (error) {
      console.error('Falha ao obter o próximo ID disponível:', error);
      throw error;
  }
}

export const getEmissaoById = async (id: String): Promise<Emissao> => {
  try{
      const response = await axios.get<Emissao>(`${apiUrl}/${id}`);
      const item = response.data;
      return {
        id:item.id,
        num_as: item.num_as,
        emissao: item.emissao,
        motivo: item.motivo,
        desc_motivo: item.desc_motivo,
        emitir_projeto_lb: item.emitir_projeto_lb,
        emitir_proj_rp: item.emitir_proj_rp,
        emitir_proj_real: item.emitir_proj_real,
        comentar_projeto_lb: item.comentar_projeto_lb,
        coment_proj_rp: item.coment_proj_rp,
        coment_proj_real: item.coment_proj_real,
        atender_coment_proj_lb: item.atender_coment_proj_lb,
        atender_coment_proj_rp: item.atender_coment_proj_rp,
        atender_coment_proj_real: item.atender_coment_proj_real,
        flag_aprov: item.flag_aprov,
        flag_aprov_coment: item.flag_aprov_coment,
        flag_reprov: item.flag_reprov,
        justificativa: item.justificativa,
        log: item.log,
        }
  } catch (error) {
      console.error('Falha em obter os dados:', error);
      throw error;
  }
};
