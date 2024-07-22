type Comentario = {
    id?: string;
    comentario: string;
    data_envio: string;
    num_as: string;
    user?: string;
    perfil: string;
}

export const throwDate = () => {
    return new Date();
}

export default Comentario;