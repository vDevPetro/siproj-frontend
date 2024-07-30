import React, { useRef, useState } from "react";
import styled from "styled-components";
import { parse, isSameDay } from "date-fns";
import Comentario, { throwDate } from "../../../../model/Comentario";
import { getCurrentDateTime } from "../../../pages/historico";
import { useUserContext } from "../../../../context/UserContext";
import { nomeAbreviado } from "../../../../model/Usuario";

const Container = styled.div`
    padding: 1.25rem 2.125rem;
    text-align: justify;
    position: relative;
    background: #ffffff;
    border-radius: 2rem;

    @media (max-width: 767.98px) {
        padding: 1.25rem 1.25rem;

        h4 {
            margin: 0 !important;
        }
    }

    i {
        cursor: pointer;
    }

    input.edit {
        border: 0;
    }

    input.edit :focus {
        border: 0;
    }
`;

const Date = styled.small`
    color: #c7c7c7;
    margin-bottom: 15px;
    display: inline-block;

    @media (max-width: 767.98px) {
        margin-bottom: 0.25rem;
    }
`;

const Text = styled.p`
    
`;

type Props = {
    comentario: Comentario;
    excluir: (Comentario: Comentario) => void;
    editar: (comentario: Comentario, update: string) => void;
}

const ehoje = (dateString: string): boolean => {
    const date = parse(dateString, 'dd/MM/yyyy HH:mm', throwDate());
    const hoje = parse(getCurrentDateTime(), 'dd/MM/yyyy HH:mm', throwDate());
    return isSameDay(date, hoje);
}

const TextComment = ({comentario, excluir, editar} : Props) => {
    const [edit, SetEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { user } = useUserContext();
    const [updatedComment, setUpdatedComment] = useState(comentario.comentario);

    const toggleEdit = () => {
        SetEdit(!edit)
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <Container className="tl-text-box">
            <h4>{nomeAbreviado(comentario.nome || '')}</h4>
            <div className="d-flex justify-content-between">
                <Date>{comentario.data_envio}</Date>
                {ehoje(comentario.data_envio) ? 
                    <div className="d-flex">
                        <i className="bi bi-pencil me-3" onClick={toggleEdit}/>
                        <i className="bi bi-trash" onClick={() => excluir(comentario)}/>                    
                    </div> 
                    : 
                    <></>                
                }
                
            </div>            
            <Text>
                {edit ? 
                    <>
                        <textarea  className="form-control" value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)}/>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-success" onClick={() => editar(comentario, updatedComment)}><i className="bi bi-floppy"/></button>
                        </div>
                    </>
                    :
                    comentario.comentario
                }
                
            </Text>
        </Container>
    )
}

export default TextComment;