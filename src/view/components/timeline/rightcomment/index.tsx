import styled from "styled-components";
import TextComment from "../textcomment";
import Comentario from "../../../../model/Comentario";

const Container = styled.div`

`;

const Arrow = styled.span`

`;

const Logo = styled.img`

`;

type Props = {
    id: string;
    item: Comentario;
}

const RightComment = ({ id, item } : Props) => {

    return (
        <Container>
            <Logo src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Fpetro_logo.png?alt=media&token=030edc6e-8a2a-491c-9a38-f8949b39dfc4"/>
            <TextComment nome={item.user || ''} data={item.data_envio} comentario={item.comentario} />
            <Arrow/>
        </Container>
    )
}

export default RightComment;