import Comentario from "../../../model/Comentario";
import { getByAs, postComment } from "../../../controller/Comentarios";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import Timeline from "../../components/timeline";
import styled from "styled-components";
import { useUserContext } from "../../../context/UserContext";

interface ContainerProps {
    animationTime: string;
}

const Container = styled.div<ContainerProps>`
    .form-control {
        margin: 0 !important;
        padding: 0.75rem 1.5rem;
        border: 0;
        border-radius: 2rem;
        background: #ffffff;
        box-shadow:  10px 10px 20px #d9d9d9,
                    -10px -10px 20px #ffffff;
    }

    .form-control:focus {
        box-shadow: inset 8px 8px 23px #d9d9d9,
            inset -8px -8px 23px #ffffff;
    }

    .btn {
        border-radius: 2rem !important;
    }

    .btn .bi {
        font-size: 2.2rem; 
    }

    
    .timeline::after {
    content: ' ';
    position: absolute;
    width: 0.375rem;
    height: 100%;
    background: #fff;
    top: 0;
    left: 50%;
    margin-left: -3px;
    z-index: 0;
    box-shadow: inset 1px 1px 3px #d4d4d4,
                inset -1px -1px 3px #ffffff;
    border-radius: 50px;
    animation: moveline ${props => props.animationTime}s linear forwards;
    }
    @keyframes moveline {
    0% {
        height: 0;
    }

    100% {
        height: 100%;
    }
    }

    @media (max-width: 767.98px) {
    .timeline::after {
        left: 2rem;
    }
    }

`

const getCurrentDateTime = (): string => {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero, por isso é necessário adicionar 1
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Historico = () => {
    const { id } = useParams();
    const [historico, setHistorico] = useState<Comentario[]>();
    const [comentario, setComentario] = useState('');
    const [status, setStatus] = useState<number | null>(null);
    const { user } = useUserContext();
    const [res, setRes] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getByAs(id);
            setHistorico(res);
        }

        fetchData();
    }, []);

    const enviar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(user && id) {
            try {
                const data = getCurrentDateTime();
                const novo: Comentario = {
                    comentario: comentario,
                    user: user.nome,
                    data_envio: data,
                    num_as: id.toString(),
                    perfil: user.nivel
                }
                const response = await postComment(novo);
                setStatus(response.status);
                setRes(response.data);
                setComentario('');
                setHistorico(await getByAs(id));
            } catch (error) {
                console.log(error);
                setStatus(404);
            }
        } else {
            alert('Usuário e|ou ID da AS inválidos');
        }
    }

    return(
        <Container animationTime={`${historico?.length.toString()}`}>
            <Timeline historico={historico}/>
            {historico &&
                <form className="row col-12 px-2 px-sm-5 pt-2 pt-sm-5" onSubmit={enviar}>
                    <div className="d-flex col-10">
                        <textarea rows={2} className="form-control" placeholder="Insira o comentário aqui..." value={comentario} onChange={(e) => setComentario(e.target.value)}/>
                    </div>
                    <button className="btn btn-success col-2" type="submit" ><i className="bi bi-chat-dots"/></button>
                </form>
            }
        </Container>
    )
}

export default Historico;