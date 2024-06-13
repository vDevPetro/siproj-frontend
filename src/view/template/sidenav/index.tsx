import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Usuario } from "../../../model/Usuario";
import { getUser } from "../../../controller/Users";
import { onAuthStateChanged, User } from "firebase/auth";
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
                <i className="bi bi-grid"></i>
                <span>Painel</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" >
                <i className="bi bi-journal-text"></i><span>Contrato</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a className={`${location.pathname === '/contrato/cadastrarempresa' ? 'active' : ''}`} onClick={() => handleNavigate('/contrato/cadastrarempresa')}>
                        <i className="bi bi-circle"></i><span>Cadastrar empresa</span>
                    </a>
                </li>
                <li>
                    <a className={`${location.pathname === '/contrato/buscarempresa' ? 'active' : ''}`} onClick={() => handleNavigate('/contrato/buscarempresa')}>
                        <i className="bi bi-circle"></i><span>Buscar empresa</span>
                    </a>
                </li>
                <li>
                    <a className={`${location.pathname === '/contrato/cadastrarcontrato' ? 'active' : ''}`} onClick={() => handleNavigate('/contrato/cadastrarcontrato')}>
                        <i className="bi bi-circle"></i><span>Cadastrar contrato</span>
                    </a>
                </li>
                <li>
                    <a href="forms-validation.html">
                    <i className="bi bi-circle"></i><span>Listar contratos</span>
                    </a>
                </li>
                </ul>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-menu-button-wide"></i><span>Demanda</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li >
                    <a href="components-alerts.html" >
                    <i className="bi bi-circle"></i><span>Alerts</span>
                    </a>
                </li>
                <li>
                    <a href="components-accordion.html">
                    <i className="bi bi-circle"></i><span>Accordion</span>
                    </a>
                </li>
                <li>
                    <a href="components-badges.html">
                    <i className="bi bi-circle"></i><span>Badges</span>
                    </a>
                </li>
                <li>
                    <a href="components-breadcrumbs.html">
                    <i className="bi bi-circle"></i><span>Breadcrumbs</span>
                    </a>
                </li>
                </ul>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-layout-text-window-reverse"></i><span>PPU</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a href="tables-general.html">
                    <i className="bi bi-circle"></i><span>General Tables</span>
                    </a>
                </li>
                <li>
                    <a href="tables-data.html">
                    <i className="bi bi-circle"></i><span>Data Tables</span>
                    </a>
                </li>
                </ul>
            </li>
            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-gem"></i><span>Critério</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a href="icons-bootstrap.html">
                    <i className="bi bi-circle"></i><span>Bootstrap Icons</span>
                    </a>
                </li>
                <li>
                    <a href="icons-remix.html">
                    <i className="bi bi-circle"></i><span>Remix Icons</span>
                    </a>
                </li>
                <li>
                    <a href="icons-boxicons.html">
                    <i className="bi bi-circle"></i><span>Boxicons</span>
                    </a>
                </li>
                </ul>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/reajuste' ? '' : 'collapsed'}`} onClick={() => handleNavigate('/reajuste')} id="reajuste">
                    <i className="bi bi-wrench-adjustable"></i>
                    <span>Reajuste</span>
                </a>
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
                    <i className="bi bi-menu-button-wide"></i><span>Projetos</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li >
                        <a href="components-alerts.html" >
                        <i className="bi bi-circle"></i><span>Alerts</span>
                        </a>
                    </li>
                    <li>
                        <a href="components-accordion.html">
                        <i className="bi bi-circle"></i><span>Accordion</span>
                        </a>
                    </li>
                    <li>
                        <a href="components-badges.html">
                        <i className="bi bi-circle"></i><span>Badges</span>
                        </a>
                    </li>
                    </ul>
                </li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-journal-text"></i><span>Cronogramas</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="forms-elements.html">
                        <i className="bi bi-circle"></i><span>Form Elements</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms-layouts.html">
                        <i className="bi bi-circle"></i><span>Form Layouts</span>
                        </a>
                    </li>
                    </ul>
                </li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-layout-text-window-reverse"></i><span>Medições</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="tables-general.html">
                        <i className="bi bi-circle"></i><span>General Tables</span>
                        </a>
                    </li>
                    <li>
                        <a href="tables-data.html">
                        <i className="bi bi-circle"></i><span>Data Tables</span>
                        </a>
                    </li>
                    </ul>
                </li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-bar-chart"></i><span>Relatórios</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="charts-chartjs.html">
                        <i className="bi bi-circle"></i><span>Chart.js</span>
                        </a>
                    </li>
                    <li>
                        <a href="charts-apexcharts.html">
                        <i className="bi bi-circle"></i><span>ApexCharts</span>
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
                    <i className="bi bi-menu-button-wide"></i><span>Demanda</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li >
                        <a href="components-alerts.html" >
                        <i className="bi bi-circle"></i><span>Alerts</span>
                        </a>
                    </li>
                    <li>
                        <a href="components-accordion.html">
                        <i className="bi bi-circle"></i><span>Accordion</span>
                        </a>
                    </li>
                    <li>
                        <a href="components-badges.html">
                        <i className="bi bi-circle"></i><span>Badges</span>
                        </a>
                    </li>
                    </ul>
                </li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-journal-text"></i><span>Cronogramas</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="forms-elements.html">
                        <i className="bi bi-circle"></i><span>Form Elements</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms-layouts.html">
                        <i className="bi bi-circle"></i><span>Form Layouts</span>
                        </a>
                    </li>
                    </ul>
                </li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-layout-text-window-reverse"></i><span>Medições</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="tables-general.html">
                        <i className="bi bi-circle"></i><span>General Tables</span>
                        </a>
                    </li>
                    <li>
                        <a href="tables-data.html">
                        <i className="bi bi-circle"></i><span>Data Tables</span>
                        </a>
                    </li>
                    </ul>
                </li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-bar-chart"></i><span>Relatórios</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="charts-chartjs.html">
                        <i className="bi bi-circle"></i><span>Chart.js</span>
                        </a>
                    </li>
                    <li>
                        <a href="charts-apexcharts.html">
                        <i className="bi bi-circle"></i><span>ApexCharts</span>
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