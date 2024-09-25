import Emissao from "../model/Emissao";
import axios from "axios";
import { apiKey } from "./ConnectionFactory";

const apiUrl = "https://apisiproj.vercel.app/emissao";

export const getEmissao = async (num_as:string | undefined): Promise<Emissao[]> => {
  try {
      const response = await axios.get<Emissao[]>(`${apiUrl}/${num_as}`, {
        headers: {
          Authorization: apiKey,
        },
      });
      return response.data.map(item => ({
        id: item.id,
        num_as: item.num_as,
        emissao: Number(item.emissao),
        motivo: item.motivo,
        desc_motivo: item.desc_motivo,
        emitir_proj_lb: item.emitir_proj_lb,
        emitir_proj_rp: item.emitir_proj_rp,
        emitir_proj_real: item.emitir_proj_real,
        coment_proj_lb: item.coment_proj_lb,
        coment_proj_rp: item.coment_proj_rp,
        coment_proj_real: item.coment_proj_real,
        atender_coment_proj_lb: item.atender_coment_proj_lb,
        atender_coment_proj_rp: item.atender_coment_proj_rp,
        atender_coment_proj_real: item.atender_coment_proj_real,
        situacao: item.situacao,
        justificativa: item.justificativa,
        log: ''
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

export const putEmissao = async (emissao: Emissao): Promise<{ status: number; data: any}> => {
  try {
    const response = await axios.put(`${apiUrl}/${emissao.num_as}/${emissao.emissao}`, 
      {
        num_as: emissao.num_as,
        emissao: emissao.emissao.toString(),
        motivo: emissao.motivo,
        desc_motivo: emissao.desc_motivo,
        emitir_proj_lb: emissao.emitir_proj_lb,
        emitir_proj_rp: emissao.emitir_proj_rp,
        emitir_proj_real: emissao.emitir_proj_real,
        coment_proj_lb: emissao.coment_proj_lb,
        coment_proj_rp: emissao.coment_proj_rp,
        coment_proj_real: emissao.coment_proj_real,
        atender_coment_proj_lb: emissao.atender_coment_proj_lb,
        atender_coment_proj_rp: emissao.atender_coment_proj_rp,
        atender_coment_proj_real: emissao.atender_coment_proj_real,
        situacao: emissao.situacao,
        justificativa: emissao.justificativa,
        log: ''
      },
      {
        headers: {
            Authorization: apiKey,
        }
      });
    return { status: response.status, data: response.data }
  } catch (error) {
    console.error('Falha ao atualizar emissao: ', error);
    throw error;
  }
};

export const postEmissao = async (emissao: Emissao): Promise<{ status: number; data: any }> => {
  try {
    const response = await axios.post(apiUrl, 
      {
        num_as: emissao.num_as,
        emissao: emissao.emissao.toString(),
        motivo: emissao.motivo,
        desc_motivo: emissao.desc_motivo,
        emitir_proj_lb: emissao.emitir_proj_lb,
        emitir_proj_rp: emissao.emitir_proj_rp,
        emitir_proj_real: emissao.emitir_proj_real,
        coment_proj_lb: emissao.coment_proj_lb,
        coment_proj_rp: emissao.coment_proj_rp,
        coment_proj_real: emissao.coment_proj_real,
        atender_coment_proj_lb: emissao.atender_coment_proj_lb,
        atender_coment_proj_rp: emissao.atender_coment_proj_rp,
        atender_coment_proj_real: emissao.atender_coment_proj_real,
        situacao: emissao.situacao,
        justificativa: emissao.justificativa,
        log: ''
      },
      {
        headers: {
            Authorization: apiKey,
        }
      });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Falha ao enviar os dados:', error);
    throw error;
  }
};

export const getNextAvailableId = async (): Promise<number> => {
  try {
      const response = await axios.get<{ nextId: number }>(`${apiUrl}/nextid`, {
        headers: {
          Authorization: apiKey,
        },
      });
      return response.data.nextId;
  } catch (error) {
      console.error('Falha ao obter o próximo ID disponível:', error);
      throw error;
  }
}

export const getEmissaoById = async (id: String): Promise<Emissao> => {
  try{
      const response = await axios.get<Emissao>(`${apiUrl}/${id}`, {
        headers: {
          Authorization: apiKey,
        },
      });
      const item = response.data;
      return {
        id:item.id,
        num_as: item.num_as,
        emissao: item.emissao,
        motivo: item.motivo,
        desc_motivo: item.desc_motivo,
        emitir_proj_lb: item.emitir_proj_lb,
        emitir_proj_rp: item.emitir_proj_rp,
        emitir_proj_real: item.emitir_proj_real,
        coment_proj_lb: item.coment_proj_lb,
        coment_proj_rp: item.coment_proj_rp,
        coment_proj_real: item.coment_proj_real,
        atender_coment_proj_lb: item.atender_coment_proj_lb,
        atender_coment_proj_rp: item.atender_coment_proj_rp,
        atender_coment_proj_real: item.atender_coment_proj_real,
        situacao: item.situacao,
        justificativa: item.justificativa,
        log: item.log,
        }
  } catch (error) {
      console.error('Falha em obter os dados:', error);
      throw error;
  }
};
