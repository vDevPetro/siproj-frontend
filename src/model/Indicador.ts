type Indicador = {
    num_as: string;
    data: [{
        date: string;
        baselineWork: number;
        work: number;
        actualWork: number;
    }];
    iefMes?: string;
    iefAno?: string;
}

export default Indicador;