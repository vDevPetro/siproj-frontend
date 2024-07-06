import Comentario from "../../../model/Comentario";
import styled from "styled-components";
import LeftComment from "./leftcomment";
import RightComment from "./rightcomment";

type Props = {
    historico: Comentario[] | undefined;
}

const Container = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 100px 0 0 0;
        
    
    @media (max-width: 767.98px) {
        margin: 3.125rem auto;
        
    }
`;

const Timeline = ({ historico } : Props) => {

    if(historico){
        return(
            <Container className="timeline">
                {historico.map(item => 
                    item.perfil === 'CONTRATADA' ? (
                        <LeftComment id={item.id} item={item} />
                    ) : (
                        <RightComment id={item.id} item={item} />
                    )
                )}
            </Container>
        )
    } else {
        return(
            <>
            </>
        )
    }
}

export default Timeline;