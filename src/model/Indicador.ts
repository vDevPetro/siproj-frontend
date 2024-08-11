type Indicador = {
    
    data: [{
        date: string;
        trabalho_lb: number;
        trabalho: number;
        trabalho_real: number;
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