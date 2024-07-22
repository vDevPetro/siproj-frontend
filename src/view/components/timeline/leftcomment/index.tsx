import styled from "styled-components";
import TextComment from "../textcomment";
import Comentario from "../../../../model/Comentario";

const Container = styled.div`
    left: 0;
    padding: 0.75rem 3rem;
    position: relative;
    width: 50%;
    animation: movedown 1s linear forwards;
    opacity: 0;
    z-index: 1;
    @keyframes movedown {
        0% {
            opacity: 1;
            transform: translateY(-30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .tl-text-box {
        box-shadow:  -8px 8px 24px #d4d4d4,
            8px -8px 24px #ffffff;
    }

    :nth-child(1) {
        animation-delay: 0s;
    }

    :nth-child(2) {
        animation-delay: 1s;
    }

    :nth-child(3) {
        animation-delay: 2s;
    }

    :nth-child(4) {
        animation-delay: 3s;
    }

    :nth-child(5) {
        animation-delay: 4s;
    }

    :nth-child(6) {
        animation-delay: 5s;
    }

    :nth-child(7) {
        animation-delay: 6s;
    }

    :nth-child(8) {
        animation-delay: 7s;
    }

    :nth-child(9) {
        animation-delay: 8s;
    }

    :nth-child(10) {
        animation-delay: 9s;
    }

    @media (max-width: 767.98px) {
        width: 100%;
        padding-left: 5rem;
        padding-right: 1.5rem;
    }
`;

const Arrow = styled.span`
    height: 0;
    width: 0;
    position: absolute;
    box-sizing: border-box;
    top: 2.25rem;
    border-top: 1rem solid transparent;
    border-bottom: 1rem solid transparent;
    border-left: 1rem solid #e7e7e7;
    right: 2rem;


    @media (max-width: 767.98px) {
        border-right: 15px solid #e7e7e7;
        border-left: 0;
        left: 4.05rem;
    }
`;

const Logo = styled.img`
    position: absolute;
    width: 2.5rem;
    border-radius: 50%;
    right: -1.25rem;
    top: 2rem;
    z-index: 10;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow:  8px 8px 24px #d4d4d4,
                -8px -8px 24px #ffffff;

    @media (max-width: 767.98px) {
        left: 0.625rem;
    }
`;

type Props = {
    item: Comentario;
    excluir: (comentario: Comentario) => void;
    editar: (comentario: Comentario, update: string) => void;
}

const LeftComment = ({ item, excluir, editar } : Props) => {

    return (
        <Container>
            <Logo src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Frina_logo.png?alt=media&token=deb6343d-374a-4f97-8194-9c9dd4788121"/>
            <TextComment comentario={item} excluir={excluir} editar={editar}/>
            <Arrow/>
        </Container>
    )
}

export default LeftComment;