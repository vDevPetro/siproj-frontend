import Comentario from "../../../model/Comentario";
import { getByAs, postComment, deleteComment, updateComment } from "../../../controller/Comentarios";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import Timeline from "../../components/timeline";
import styled from "styled-components";
import { useUserContext } from "../../../context/UserContext";
import { parse } from 'date-fns';
import { useRef } from "react";

interface ContainerProps {
    animationTime: string;
}

const Container = styled.div<ContainerProps>`
    #novocoment {
        margin: 0 !important;
        padding: 0.75rem 1.5rem;
        border: 0;
        border-radius: 2rem;
        background: #ffffff;
        box-shadow:  10px 10px 20px #d9d9d9,
                    -10px -10px 20px #ffffff;
    }

    #novocoment:focus {
        box-shadow: inset 8px 8px 23px #d9d9d9,
            inset -8px -8px 23px #ffffff;
    }

    .btn {
        border-radius: 2rem !important;
    }

    form .btn .bi {
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

export const getCurrentDateTime = (): string => {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero, por isso é necessário adicionar 1
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
};

const Historico = () => {
    const { id } = useParams();
    const [historico, setHistorico] = useState<Comentario[]>();
    const [comentario, setComentario] = useState('');
    const [status, setStatus] = useState<number | null>(null);
    const { user } = useUserContext();
    const [res, setRes] = useState<any>(null);
    const [comentUpdate, setComentUpdate] = useState('');
    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (hasFetchedData.current) return; 
        hasFetchedData.current = true;

        const fetchData = async () => {
            const res = await getByAs(id);
            const sortedRes = res.sort((a, b) => {
                const dateA = parse(a.data_envio, 'dd/MM/yyyy HH:mm', new Date());
                const dateB = parse(b.data_envio, 'dd/MM/yyyy HH:mm', new Date());
                return dateA.getTime() - dateB.getTime();
            })
            setHistorico(sortedRes);
        }

        fetchData();
    }, []);

    const fetch = async() => {
        const res = await getByAs(id);
        const sortedRes = res.sort((a, b) => {
            const dateA = parse(a.data_envio, 'dd/MM/yyyy HH:mm', new Date());
            const dateB = parse(b.data_envio, 'dd/MM/yyyy HH:mm', new Date());
            return dateA.getTime() - dateB.getTime();
        })
        setHistorico(sortedRes);
    }

    const excluir = async(comentario: Comentario) => {
        if (user && user.email === comentario.user && comentario.id){
            await deleteComment(comentario).then(async () => {
                setHistorico(undefined);
                await fetch();
            })
        } else {
            alert('Você só pode excluir seus próprios comentários');
        }
    }

    const editar = async(comentario: Comentario, update: string) => {
        if (user && user.email === comentario.user && comentario.id){
            await updateComment(comentario, update).then(async (res) => {
                if (res.status === 200) {
                    setHistorico(undefined);
                    await fetch();
                } else {
                    console.error(res.status + res.data);
                }
            })
        } else {
            alert('Você só pode editar seus próprios comentários');
        }
    }    

    const enviar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(user && id) {
            try {
                const data = getCurrentDateTime();
                const novo: Comentario = {
                    comentario: comentario,
                    user: user.email,
                    data_envio: data,
                    num_as: id.toString(),
                    perfil: user.nivel,
                    nome: user.nome
                }
                const response = await postComment(novo);
                setHistorico(undefined)
                setStatus(response.status);
                setRes(response.data);
                setComentario('');
                await fetch();
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
            <Timeline historico={historico} excluir={excluir} editar={editar}/>
            {historico &&
                <form className="row col-12 px-2 px-sm-5 pt-2 pt-sm-5" onSubmit={enviar}>
                    <div className="d-flex col-10">
                        <textarea rows={2} className="form-control" id="novocoment" placeholder="Insira o comentário aqui..." value={comentario} onChange={(e) => setComentario(e.target.value)}/>
                    </div>
                    <button className="btn btn-success col-2 d-flex justify-content-center" type="submit"><i className="bi bi-chat-dots my-auto"/><p className="d-none d-md-block ms-2 my-auto">Enviar</p></button>
                </form>
            }
        </Container>
    )
}

export default Historico;