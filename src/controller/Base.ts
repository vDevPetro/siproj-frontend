import Base from "../model/Base"
import axios, { AxiosError } from "axios"

const apiUrl = "https://apisiproj.vercel.app/as";

export const getBase = async (): Promise<Base[]> => {
    try {
        const response = await axios.get<Base[]>(apiUrl);
        return response.data.map(item => ({
            id: item.id,
            tipo: item.tipo,
            unidade: item.unidade,
            fiscais: item.fiscais,
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
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error('Endpoint não encontrado (404):', error);
            throw new Error('Endpoint não encontrado (404)');
        } else {
            console.error('Falha em obter os dados:', error);
            throw error;
        }
    }
};

export const postBase = async (base: Base): Promise<{ status: number; data: any }> => {
    try {
        const response = await axios.post(apiUrl, {
            id: base.id,
            contrato_icj: base.contrato_icj,
            contrato_sap: base.contrato_sap,
            desc_projeto: base.desc_projeto,
            porte: base.porte,
            prioridade: base.prioridade,
            fiscais: base.fiscais,
            resp_petro: base.resp_petro,
            resp_contr: base.resp_contr,
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
}

export const getBaseById = async (id: String): Promise<Base> => {
  try{
      const response = await axios.get<Base>(`${apiUrl}/${id}`);
      const item = response.data;
      return {
        id: Number(item.id),
        tipo: item.tipo,
        unidade: item.unidade,
        fiscais: item.fiscais,
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
      }
  } catch (error) {
      console.error('Falha em obter os dados:', error);
      throw error;
  }
};

export const updateBase = async (base: Base, email: string): Promise<{ status: number; data: any }> => {
    try {
        const response = await axios.put(`${apiUrl}/${base.id}`, {
            tipo: base.tipo,
            unidade: base.unidade,
            fiscais: base.fiscais,
            resp_petro: base.resp_petro,
            resp_contr: base.resp_contr,
            contrato_icj: base.contrato_icj,
            contrato_sap: base.contrato_sap,
            pep: base.pep,
            desc_projeto: base.desc_projeto,
            porte: base.porte,
            criticidade: base.criticidade,
            prioridade: base.prioridade,
            objetivo: base.objetivo,
            escopo: base.escopo,
            log: email + ' - ' + getCurrentDateTime()
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Falha ao enviar os dados:', error);
        throw error;
    }
};

const getCurrentDateTime = (): string => {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero, por isso é necessário adicionar 1
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};
