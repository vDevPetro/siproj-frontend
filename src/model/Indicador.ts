type Indicador = {
    
    data: [{
        date: string;
        trabalho_lb: string;
        trabalho: string;
        trabalho_real: string;
    }];
    num_as: string;
    maxWork: number;
    iefMes: number;
    prevMes: number;
    realMes: number;
    iefAno: number;
    prevAno: number;
    realAno: number;
    statusDate?: string;
}

export default Indicador;