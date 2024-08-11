type Indicador = {
    num_as: string;
    data: [{
        date: string;
        baselineWork: string;
        work: string;
        actualWork: string;
    }];
    iefMes?: string;
    iefAno?: string;
}

export default Indicador;