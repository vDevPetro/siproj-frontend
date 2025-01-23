import styled from "styled-components";
import { Card, Button, Placeholder, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


type CardProps = {
    id: number;
    desc: string;
    respPetro: string;
    tipo: string;
    pep: string;
}

const Cartao = (props: CardProps) => {
    const navigate = useNavigate();

    return(
            <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                <Card style={{minHeight: '20rem'}} >
                    <Card.Header>{props.id} - {props.tipo}</Card.Header>
                    <Card.Body>
                        <Card.Title>{props.pep}</Card.Title>
                        <Card.Text>
                            {props.desc}
                        </Card.Text>
                        <Card.Footer>Responsável: {props.respPetro}</Card.Footer>
                        <Link to={`/as/${props.id}/atualizar`} className="btn btn-success">Abrir</Link>
                    </Card.Body>
                </Card>
            </div>
    )
}

export default Cartao;