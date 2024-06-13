import styled from "styled-components";
import { signOut, User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../controller/ConnectionFactory';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../controller/Users";
import { Usuario } from "../../../model/Usuario";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [userData, setUserData] = useState<Usuario>();
    //add event listener para ocultar ou desocultar a sidebar
    useEffect(() => {
        const fetchUserData = async (email: string | null) => {
            if (email !== null) {
                setUserData(await getUser(email));
            }
        };

        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                fetchUserData(user.email);
            }
        })
        
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('toggle-sidebar-btn')) {
                document.body.classList.toggle('toggle-sidebar');
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    const logout = async () => {
        await signOut(auth);
        navigate('/');
    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
            <a href="index.html" className="logo d-flex align-items-center">
                <img src="" alt=""/>
                <span className="d-none d-lg-block">SiProj</span>
            </a>
            <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <div className="search-bar">
            <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Pesquisar" title="Enter search keyword"/>
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
            </div>

            <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">

                <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle " href="#">
                    <i className="bi bi-search"></i>
                </a>
                </li>

                <li className="nav-item dropdown">

                <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-bell"></i>
                </a>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                    <li className="dropdown-header">
                    You have 4 new notifications
                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                    </li>
                    <li>
                    <hr className="dropdown-divider"/>
                    </li>

                    <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                        <h4>Lorem Ipsum</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>30 min. ago</p>
                    </div>
                    </li>

                    <li>
                    <hr className="dropdown-divider"/>
                    </li>

                    <li className="notification-item">
                    <i className="bi bi-x-circle text-danger"></i>
                    <div>
                        <h4>Atque rerum nesciunt</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>1 hr. ago</p>
                    </div>
                    </li>

                    <li>
                    <hr className="dropdown-divider"/>
                    </li>

                    <li className="notification-item">
                    <i className="bi bi-check-circle text-success"></i>
                    <div>
                        <h4>Sit rerum fuga</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>2 hrs. ago</p>
                    </div>
                    </li>

                    <li>
                    <hr className="dropdown-divider"/>
                    </li>

                    <li className="notification-item">
                    <i className="bi bi-info-circle text-primary"></i>
                    <div>
                        <h4>Dicta reprehenderit</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>4 hrs. ago</p>
                    </div>
                    </li>

                    <li>
                    <hr className="dropdown-divider"/>
                    </li>
                    <li className="dropdown-footer">
                    <a href="#">Show all notifications</a>
                    </li>

                </ul>

                </li>

                <li className="nav-item dropdown pe-3">

                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src="assets/img/message-2.img" alt="Profile" className="rounded-circle"/>
                    <span className="d-none d-md-block dropdown-toggle ps-2">{userData?.nome}</span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li className="dropdown-header">
                    <h6>{user?.email}</h6>
                    <span>{userData?.nivel.toLowerCase()}</span>
                    </li>
                    <li>
                    <hr className="dropdown-divider"/>
                    </li>

                    <li>
                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                        <i className="bi bi-person"></i>
                        <span>Meu perfil</span>
                    </a>
                    </li>
                    <li>
                    <hr className="dropdown-divider"/>
                    </li>
                    <li>
                        <a className="dropdown-item d-flex align-items-center" >
                            <i className="bi bi-question-circle"></i>
                            <span>Ajuda</span>
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>

                    <li>
                        <a className="dropdown-item d-flex align-items-center" onClick={logout}>
                            <i className="bi bi-box-arrow-right "></i>
                            <span>Sair</span>
                        </a>
                    </li>

                </ul>
                </li>

            </ul>
            </nav>

        </header>
    )
}

export default Header