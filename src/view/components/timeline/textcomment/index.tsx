import styled from "styled-components";

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