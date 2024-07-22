import Comentario from "../../../model/Comentario";
import styled from "styled-components";
import LeftComment from "./leftcomment";
import RightComment from "./rightcomment";
import { Spinner } from "react-bootstrap";

type Props = {
    historico: Comentario[] | undefined;
    excluir: (comentario: Comentario) => void;
    editar: (comentario: Comentario, update: string) => void;
}

const Container = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 100px 0 0 0;
        
    
    @media (max-width: 767.98px) {
        margin: 3.125rem auto;
        
    }
`;

const Timeline = ({ historico, excluir, editar } : Props) => {

    if(historico){
        return(
            <Container className="timeline">
                {historico.map(item => 
                    item.perfil === 'CONTRATADA' ? (
                        <LeftComment item={item} excluir={excluir} editar={editar} />
                    ) : (
                        <RightComment item={item} excluir={excluir} editar={editar} />
                    )
                )}
            </Container>
        )
    } else {
        return(
            <Container className="d-flex justify-content-center">
                <Spinner animation="border" role="status" variant="success">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }
}

export default Timeline;