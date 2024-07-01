import styled from "styled-components";
import { Card, Button, Placeholder } from "react-bootstrap";

const Container = styled.div`
    width: 30%;
`;

type CardProps = {
    id: number;
    desc: string;
    respPetro: string;
    tipo: string;
    pep: string;
}

const Cartao = (props: CardProps) => {
    return(
        <Container className="d-flex  row">
            <Card>
                <Card.Header>{props.id} - {props.tipo}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.pep}</Card.Title>
                    <Card.Text>
                        {props.desc}
                    </Card.Text>
                    <Card.Footer>Responsável: {props.respPetro}</Card.Footer>
                    <Button variant="success">Abrir</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Cartao;