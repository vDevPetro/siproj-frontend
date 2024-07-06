import Comentario from "../../../model/Comentario";
import { getByAs } from "../../../controller/Comentarios";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import Timeline from "../../components/timeline";
import styled from "styled-components";

const Container = styled.div`
    .form-control {
        margin: 0 !important;
    }
`

const Historico = () => {
    const { id } = useParams();
    const [historico, setHistorico] = useState<Comentario[]>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getByAs(id);
            setHistorico(res);
        }

        fetchData();
    }, []);

    const enviar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Ainda não implementado!');
    }

    return(
        <Container>
            <Timeline historico={historico}/>
            <form className="row col-12 px-2 px-sm-5 pt-2 pt-sm-5" onSubmit={enviar}>
                <div className="d-flex col-10">
                    <textarea rows={2} className="form-control"/>
                </div>
                <button className="btn btn-success col-2" type="submit" >Enviar</button>
            </form>
        </Container>
    )
}

export default Historico;