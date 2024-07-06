import styled from "styled-components";

const Container = styled.div`

`;

const Date = styled.small`

`;

const Text = styled.p`

`;

type Props = {
    nome: string | null;
    data: string | null;
    comentario: string | null;
}

const TextComment = ({nome, data, comentario} : Props) => {

    return (
        <Container>
            <h4>{nome}</h4>
            <Date>{data}</Date>
            <Text>
                {comentario}
            </Text>
        </Container>
    )
}

export default TextComment;