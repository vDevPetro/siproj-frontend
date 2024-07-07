import * as C from './styles';
import { useEffect, useState } from 'react';
import { auth } from '../../../controller/ConnectionFactory';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getBase } from '../../../controller/Base';
import Base from '../../../model/Base';
import Cartao from '../../components/card';
import { Card, Placeholder } from 'react-bootstrap';

const Home = () => {
    const [user, setUser] = useState<User>();
    const [base, setBase] = useState<Base[] | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                await getBase().then((data) =>{
                    const sortedData = data.sort((a, b) => a.id - b.id);
                    setBase(sortedData);
                    setLoading(false);
                });
            }  catch (error) {
                if (error instanceof Error) {
                  setError(error.message);
                } else {
                  setError('Um erro inesperado ocorreu.');
                }
              }
        }
        onAuthStateChanged(auth, (user) => {
            if(!user){
                navigate('/login');
            }
        })

        fetchData();
    }, []);

    if (loading) {
        return (
            <C.Container className='container-lg pt-5'>
                <div className='col-12 mt-2'>
                    <div className='d-flex flex-wrap justify-content-evenly'>
                        {[...Array(9)].map((_, index) => (
                                <C.CardContainer className='d-flex  row'>
                                    <Card>
                                        <Placeholder as={Card.Header} animation="glow">
                                            <Placeholder xs={1} /> <Placeholder xs={2} />
                                        </Placeholder>
                                        <Card.Body>
                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                                <Placeholder xs={7} /> <Placeholder xs={8} /> <Placeholder xs={3} />
                                            </Placeholder>
                                            <Placeholder as={Card.Footer} animation="glow">
                                                <Placeholder xs={4} /> <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder.Button variant="success" xs={3} />
                                        </Card.Body>
                                    </Card>
                                </C.CardContainer>
                            ))
                        }
                    </div>
                </div>
            </C.Container>
        );
    }

    if (!base) {
        return (
            <C.Container className='container-lg pt-5'>
                <div className='col-12 mt-2'>
                    <h2>Erro. Regarregue a página</h2>
                </div>
            </C.Container>
        )
    }


    return (
        <C.Container className='container-lg pt-5'>
            <div className='col-12 mt-2'>
                <div className='d-flex flex-wrap justify-content-evenly'>
                    {base.map(base => (
                        <Cartao
                            id={base.id} 
                            pep={base.pep || ''} 
                            desc={base.desc_projeto} 
                            respPetro={base.resp_petro}
                            tipo={base.tipo || ''}
                        />
                    ))}
                </div>
            </div>
        </C.Container>
    )
}

export default Home;