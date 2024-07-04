import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Usuario from "../../../model/Usuario";
import { getUser } from "../../../controller/Users";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../controller/ConnectionFactory";

const Sidenav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState<Usuario>();

    const handleNavigate = (path: string) => {
        navigate(path);
    }

    useEffect(() => {
        const fetchUserData = async (email: string | null) => {
            if (email !== null) {
                setUserData(await getUser(email));
            }
        };

        onAuthStateChanged(auth, (user) => {
            if(user){
                fetchUserData(user.email);
            }
        })
        
    }, []);


    return (
        <aside id="sidebar" className="sidebar">
            {userData?.nivel === 'ADMINISTRADOR' &&            
            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item">
                    <a className={`nav-link ${location.pathname === '/home' ? '' : 'collapsed'}`} onClick={() => handleNavigate('/home')}>
                    <i className="bi bi-house"></i>
                    <span>Painel</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" >
                    <i className="bi bi-journal-text"></i><span>Autorização de Serviço</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a className={`${location.pathname === '/inserirautorizacao' ? 'active' : ''}`} onClick={() => handleNavigate('/inserirautorizacao')}>
                            <i className="bi bi-circle"></i><span>Inserir</span>
                        </a>
                    </li>
                    <li>
                        <a className={`${location.pathname === '/consultarautorizacao' || location.pathname.match('/atualizarautorizacao') ? 'active' : ''}`} onClick={() => handleNavigate('/consultarautorizacao')}>
                            <i className="bi bi-circle"></i><span>Consultar</span>
                        </a>
                    </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${location.pathname === '/users' ? '' : 'collapsed'}`} onClick={() => handleNavigate('/users')} id="users">
                        <i className="bi bi-person"></i>
                        <span>Usuários</span>
                    </a>
                </li>

            </ul>
            }
            {userData?.nivel === 'OPERACIONAL' &&
                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a className={`nav-link ${location.pathname === '/home' ? '' : 'collapsed'}`} onClick={() => handleNavigate('/home')}>
                        <i className="bi bi-grid"></i>
                        <span>Painel</span>
                        </a>
                    </li>
    
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Autorização de Serviço</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li >
                                <a className={`${location.pathname === '/inserirautorizacao' ? 'active' : ''}`} onClick={() => handleNavigate('/inserirautorizacao')}>
                                    <i className="bi bi-circle"></i><span>Inserir</span>
                                </a>
                            </li>
                            <li>
                                <a className={`${location.pathname === '/consultarautorizacao' ? 'active' : ''}`} onClick={() => handleNavigate('/consultarautorizacao')}>
                                    <i className="bi bi-circle"></i><span>Consultar</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => alert('Rota não implamentada')}>
                                    <i className="bi bi-circle"></i><span>Cronograma</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => alert('Rota não implamentada')}>
                                    <i className="bi bi-circle"></i><span>Histórico</span>
                                </a>
                            </li>
                        </ul>
                    </li>
        
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i><span>Emissões</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a onClick={() => alert('Rota não implamentada')}>
                                    <i className="bi bi-circle"></i><span>Consultar</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            }
            {userData?.nivel === 'CLIENTE' &&
                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a className={`nav-link ${location.pathname === '/home' ? '' : 'collapsed'}`} onClick={() => handleNavigate('/home')}>
                        <i className="bi bi-grid"></i>
                        <span>Painel</span>
                        </a>
                    </li>
        
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Autorização de Serviço</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li >
                            <a className={`${location.pathname === '/consultarautorizacao' ? 'active' : ''}`} onClick={() => handleNavigate('/consultarautorizacao')}>
                                <i className="bi bi-circle"></i><span>Consultar</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => alert('Rota não implamentada')}>
                                <i className="bi bi-circle"></i><span>Cronograma</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => alert('Rota não implamentada')}>
                                <i className="bi bi-circle"></i><span>Histórico</span>
                            </a>
                        </li>
                        </ul>
                    </li>
        
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i><span>Emissões</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a className={`${location.pathname === '/emissoesinserir' ? 'active' : ''}`} onClick={() => handleNavigate('/emissoesinserir')} >
                                    <i className="bi bi-circle"></i><span>Inserir</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => alert('Rota não implamentada')}>
                                    <i className="bi bi-circle"></i><span>Consultar</span>
                                </a>
                            </li>
                        </ul>
                    </li>
        
                </ul>
            }
        </aside>
    )
}

export default Sidenav;