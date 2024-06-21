type Base = {
    id: number;
    tipo: string;
    unidade: string;
    resp_petro: string;
    resp_contr: string;
    contrato_icj: string;
    contrato_sap: string;
    pep: string;
    desc_projeto: string;
    porte: string;
    criticidade?: string;
    prioridade?: string;
    prevMes?: number;
    realMes?: number;
    prevAno?: number;
    realAno?: number;
    iefAno?: number;
    objetivo?: string;
    escopo?: string;
    log?: string;
}

export default Base;