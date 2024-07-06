import Comentario from "../../../model/Comentario";
import styled from "styled-components";
import LeftComment from "./leftcomment";
import RightComment from "./rightcomment";

type Props = {
    historico: Comentario[];
}

const Container = styled.div``;

const Timeline = ({ historico } : Props) => {

    return(
        <Container>
            {historico.map(item => 
                item.user ? (
                    <LeftComment id={item.id} item={item} />
                ) : (
                    <RightComment id={item.id} item={item} />
                )
            )}
        </Container>
    )
}

export default Timeline;