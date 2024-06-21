import * as C from './styles';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../controller/ConnectionFactory';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getBase } from '../../../controller/Base';
import Base from '../../../model/Base';
import Cartao from '../../components/card';

const Home = () => {
    const [user, setUser] = useState<User>();
    const [base, setBase] = useState<Base[]>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getBase();
                const sortedData = data.sort((a, b) => a.id - b.id);
                setBase(sortedData);
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
                            {base?.map(base => (
                                <Cartao
                                    id={base.id} 
                                    pep={base.pep} 
                                    desc={base.desc_projeto} 
                                    respPetro={base.resp_petro}
                                    tipo={base.tipo}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </C.Container>
    )
}

export default Home;