import Base from "../model/Base"
import axios from "axios"

const apiUrl = "https://apisiproj.vercel.app/as";

export const getBase = async (): Promise<Base[]> => {
    try{
        const response = await axios.get<Base[]>(apiUrl);
        return response.data.map(item => ({
            id: item.id,
            tipo: item.tipo,
            unidade: item.unidade,
            resp_petro: item.resp_petro,
            resp_contr: item.resp_contr,
            contrato_icj: item.contrato_icj,
            contrato_sap: item.contrato_sap,
            pep: item.pep,
            desc_projeto: item.desc_projeto,
            porte: item.porte,
            criticidade: item.criticidade,
            prioridade: item.prioridade,
            prevMes: item.prevMes,
            realMes: item.realMes,
            prevAno: item.prevAno,
            realAno: item.realAno,
            iefAno: item.iefAno,
            objetivo: item.objetivo,
            escopo: item.escopo,
            log: item.log,
        }));
    } catch (error) {
        console.error('Falha em obter os dados:', error);
        throw error;
    }
}

export const postBase = async (base: Base): Promise<{ status: number; data: any }> => {
    try {
        const response = await axios.post(apiUrl, {
            contrato_icj: base.contrato_icj,
            contrato_sap: base.contrato_sap,
            desc_projeto: base.desc_projeto,
            pep: base.pep,
            porte: base.porte,
            resp_petro: base.resp_petro,
            resp_contr: base.resp_contr,
            tipo: base.tipo,
            unidade: base.unidade
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao enviar os dados:', error);
        throw error;
    }
}

export const getNextAvailableId = async (): Promise<number> => {
    try {
        const response = await axios.get<{ nextId: number }>(`${apiUrl}/nextid`);
        return response.data.nextId;
    } catch (error) {
        console.error('Falha ao obter o próximo ID disponível:', error);
        throw error;
    }
};