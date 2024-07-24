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
            id: item.id,
            num_as: item.num_as,
            emissao_et_petro_lb: item.emissao_et_petro_lb, 
            analise_et_na: item.analise_et_na,
            reuniao_pre_lb: item.reuniao_pre_lb,
            reuniao_pre_na: item.reuniao_pre_na,
            visita_ida_lb: item.visita_ida_lb,
            visita_ida_na: item.visita_ida_na,
            visita_volta_lb: item.visita_volta_lb,
            visita_volta_na: item.visita_volta_na,
            emitir_rl_visita_lb: item.emitir_rl_visita_lb,
            emitir_rl_visita_na: item.emitir_rl_visita_na,
            aprovar_rl_visita_lb: item.aprovar_rl_visita_lb,
            aprovar_rl_visita_na: item.aprovar_rl_visita_na,
            emitir_orc_lb: item.emitir_orc_lb,
            emitir_orc_rp: item.emitir_orc_rp,
            aprovar_orc_lb: item.aprovar_orc_lb,
            aprovar_orc_rp: item.aprovar_orc_rp,
            emitir_pep_lb: item.emitir_pep_lb,
            emitir_pep_rp: item.emitir_pep_rp,
            aprovar_pep_lb: item.aprovar_pep_lb,
            aprovar_pep_rp: item.aprovar_pep_rp,
            emitir_projeto_lb: item.emitir_projeto_lb,
            comentar_projeto_lb: item.comentar_projeto_lb,
            atender_coment_projeto_lb: item.atender_coment_projeto_lb,
            data_book_lb: item.data_book_lb,
            prazo_lb: item.prazo_lb,
            prazo_rp: item.prazo_rp,
            prazo_real: item.prazo_real,
            url : item.url
        }))
    } catch(error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        console.error('Falha ao obter dados:', error);
        throw error;
    }
}