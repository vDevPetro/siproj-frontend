import Emissao from "../model/Emissao";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const apiUrl = "https://apisiproj.vercel.app/emissao/";

export const { id } = useParams();
const [historico, setHistorico] = useState<Emissao[]>();

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getByAs(id);
        setHistorico(res);
    } catch (error) {
        console.error('Falha ao obter dados:', error);
    }

      fetchData();
  }, [],; 
}

export const getEmissaoById = async (id: String): Promise<Emissao> => {
  try{
      const response = await axios.get<Emissao>(`${apiUrl}/${id}`);
      const item = response.data;
      return {
        id: Number (item.id),
        num_as: item.num_as,
        num_emissao: item.num_emissao,
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
        flag_aprov: item.flag_aprov,
        flag_aprov_coment: item.flag_aprov_coment,
        flag_reprov: item.flag_reprov,
        justificativa: item.justificativa,
        log: item.log,
      }
        }
  } catch (error) {
      console.error('Falha em obter os dados:', error);
      throw error;
  }
};
