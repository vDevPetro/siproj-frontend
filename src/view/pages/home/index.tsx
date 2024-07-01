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
    const [base, setBase] = useState<Base[]>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getBase();
                const sortedData = data.sort((a, b) => a.id - b.id);
                setBase(sortedData);
                setLoading(false);
            } catch(err) {
                alert('Erro: '+ err)
            }
        }
        onAuthStateChanged(auth, (user) => {
            if(!user){
                navigate('/login');
            }
        })

        fetchData();
    }, []);

    return (
        <C.Container>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Tela inicial {user?.uid}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">Home</li>
                        </ol>
                    </nav>
                    <div className='col-12'>
                        <div className='d-flex flex-wrap justify-content-evenly'>
                            {!loading && base?.map(base => (
                                <Cartao
                                    id={base.id} 
                                    pep={base.pep || ''} 
                                    desc={base.desc_projeto} 
                                    respPetro={base.resp_petro}
                                    tipo={base.tipo || ''}
                                />
                            ))}

                            {loading &&
                                [...Array(6)].map((_, index) => (
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
                </div>
            </main>
        </C.Container>
    )
}

export default Home;