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

const LeftComment = ({ id, item } : Props) => {

    return (
        <Container>
            <Logo src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Frina_logo.png?alt=media&token=deb6343d-374a-4f97-8194-9c9dd4788121"/>
            <TextComment nome={item.user || ''} data={item.data_envio} comentario={item.comentario} />
            <Arrow/>
        </Container>
    )
}

export default LeftComment;