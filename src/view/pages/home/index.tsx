import * as C from './styles';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../controller/ConnectionFactory';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';

const Home = () => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user){
                navigate('/login');
            }
        })
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
                </div>
            </main>
        </C.Container>
    )
}

export default Home;