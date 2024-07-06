import styled from "styled-components";

const Container = styled.div`
    padding: 1.25rem 3.125rem;
    text-align: justify;
    position: relative;
    background: #ffffff;
    border-radius: 2rem;
`;

const Date = styled.small`
    color: #c7c7c7;
    margin-bottom: 15px;
    display: inline-block;

    @media (max-width: 767.98px) {
        margin-bottom: 0.625rem;
    }
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
        <Container className="tl-text-box">
            <h4>{nome}</h4>
            <Date>{data}</Date>
            <Text>
                {comentario}
            </Text>
        </Container>
    )
}

export default TextComment;