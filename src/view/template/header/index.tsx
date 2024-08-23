import styled from "styled-components";
import { signOut, User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../controller/ConnectionFactory';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavLink from "../containerAS/NavLink";
import FilterSelect from "../../components/filterselect";
import { useUserContext } from "../../../context/UserContext";
import { Spinner } from "react-bootstrap";
import { nomeAbreviado } from "../../../model/Usuario";



const Header = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUserContext();
  
  const logout = async () => {
    await signOut(auth);
    navigate('/');
  }

  const handleNavigate = () => {
    window.open("https://firebasestorage.googleapis.com/v0/b/siproj2-5ff69.appspot.com/o/padrao%2FPasso%20a%20Passo%20SIPROJ.pdf?alt=media&token=d7be82d9-c4a1-4d01-acfd-e0c2047b4ef5", "_blank");
  }
  

  if (loading) {
    <Navbar expand="lg" className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark" sticky="top">
        <Container >
          <Navbar.Brand><img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvas" />
          <Navbar.Offcanvas
            id="offcanvas"
            aria-labelledby="title"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="title">
                <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-between flex-grow-1 pe-3">
                <div className="d-flex flex-column flex-lg-row ps-md-3">
                  <Nav.Item className="me-md-3">
                    <NavLink to='/'><i className="bi bi-house me-2" />Home</NavLink>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <>
                        <i className="bi bi-ui-checks me-2" />
                        Autorização
                      </>
                    }
                    id="dropdownas"
                    className="me-md-3"
                  >
                    <NavDropdown.Item>
                      <NavLink to='/inserirautorizacao'>
                        <i className="bi bi-folder-plus"></i>
                        Inserir
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to='/as'>
                        <i className="bi bi-list-ul"></i>
                        Consultar
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item>
                    <NavLink to='/users'><i className="bi bi-people-fill me-2" />Usuários</NavLink>
                  </Nav.Item>
                </div>
                <div className="d-flex flex-column flex-lg-row">
                  <FilterSelect/>
                  <NavDropdown title={<><i className="bi bi-person-badge me-2" /><Spinner animation="grow" size="sm" /></>} id="dropdown" className="ms-md-3">
                    <NavDropdown.Item>
                      <NavLink to='/perfil'>
                        <i className="bi bi-person"></i>
                        Perfil
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to='/ajuda'>
                        <i className="bi bi-question-circle"></i>
                        Ajuda
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                      <div className="d-flex ms-md-2">
                        <i className="bi bi-door-open" />
                        Sair
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  }

  if (user?.nivel === 'ADMINISTRADOR') {
    return (
      <Navbar expand="lg" className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark" sticky="top">
        <Container >
          <Navbar.Brand><img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvas" />
          <Navbar.Offcanvas
            id="offcanvas"
            aria-labelledby="title"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="title">
                <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-between flex-grow-1 pe-3">
                <div className="d-flex flex-column flex-lg-row ps-md-3">
                  <Nav.Item className="me-md-3">
                    <NavLink to='/'><i className="bi bi-house me-2" />Home</NavLink>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <>
                        <i className="bi bi-ui-checks me-2" />
                        Autorização
                      </>
                    }
                    id="dropdownas"
                    className="me-md-3"
                  >
                    <NavDropdown.Item>
                      <NavLink to='/inserirautorizacao'>
                        <i className="bi bi-folder-plus"></i>
                        Inserir
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to='/as'>
                        <i className="bi bi-list-ul"></i>
                        Consultar
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item>
                    <NavLink to='/users'><i className="bi bi-people-fill me-2" />Usuários</NavLink>
                  </Nav.Item>
                </div>
                <div className="d-flex flex-column flex-lg-row">
                  <FilterSelect/>
                  <NavDropdown title={<><i className="bi bi-person-badge me-2" />{nomeAbreviado(user.nome)}</>} id="dropdown" className="ms-md-3">
                    <NavDropdown.Item>
                      <NavLink to='/perfil'>
                        <i className="bi bi-person"></i>
                        Perfil
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <a onClick={(e) => handleNavigate()} href="#" className="nav-link">
            
                        <i className="bi bi-question-circle"></i>
                        Ajuda
                      </a>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout} >
                      <div className="d-flex ms-md-2">
                        <i className="bi bi-door-open" />
                        Sair
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  } else if (user?.nivel === 'CONTRATADA' || user?.nivel === 'PETROBRAS') {
    return (
      <Navbar expand="lg" className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark" sticky="top">
        <Container >
          <Navbar.Brand><img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvas" />
          <Navbar.Offcanvas
            id="offcanvas"
            aria-labelledby="title"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="title">
                <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-between flex-grow-1 pe-3">
                <div className="d-flex flex-column flex-lg-row ps-md-3">
                  <Nav.Item className="me-md-3">
                    <NavLink to='/'><i className="bi bi-house me-2" />Home</NavLink>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <>
                        <i className="bi bi-ui-checks me-2" />
                        Autorização
                      </>
                    }
                    id="dropdownas"
                    className="me-md-3"
                  >
                    <NavDropdown.Item>
                      <NavLink to='/inserirautorizacao'>
                        <i className="bi bi-folder-plus"></i>
                        Inserir
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to='/as'>
                        <i className="bi bi-list-ul"></i>
                        Consultar
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <div className="d-flex flex-column flex-lg-row">
                  <FilterSelect/>
                  <NavDropdown title={<><i className="bi bi-person-badge me-2" />{nomeAbreviado(user.nome)}</>} id="dropdown" className="ms-md-3">
                    <NavDropdown.Item>
                      <NavLink to='/perfil'>
                        <i className="bi bi-person"></i>
                        Perfil
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <a href="#" onClick={() => handleNavigate()} className="nav-link">
                        <i className="bi bi-question-circle"></i>
                        Ajuda
                      </a>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout} >
                      <div className="d-flex ms-md-2">
                        <i className="bi bi-door-open" />
                        Sair
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar expand="lg" className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark" sticky="top">
        <Container >
          <Navbar.Brand><img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvas" />
          <Navbar.Offcanvas
            id="offcanvas"
            aria-labelledby="title"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="title">
                <img src="https://firebasestorage.googleapis.com/v0/b/siproj-a2d22.appspot.com/o/assets%2Flogo-removebg-preview.png?alt=media&token=a9e1311c-f182-4c95-92e4-c419c37f4471" height={42} className="" id="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-between flex-grow-1 pe-3">
                <div className="d-flex flex-column flex-lg-row ps-md-3">
                  <Nav.Item className="me-md-3">
                    <NavLink to='/'><i className="bi bi-house me-2" />Home</NavLink>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <>
                        <i className="bi bi-ui-checks me-2" />
                        Autorização
                      </>
                    }
                    id="dropdownas"
                    className="me-md-3"
                  >
                    <NavDropdown.Item>
                      <NavLink to='/inserirautorizacao'>
                        <i className="bi bi-folder-plus"></i>
                        Inserir
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to='/as'>
                        <i className="bi bi-list-ul"></i>
                        Consultar
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <div className="d-flex flex-column flex-lg-row">
                  <FilterSelect/>
                  <NavDropdown title={<><i className="bi bi-person-badge me-2" /></>} id="dropdown" className="ms-md-3">
                    <NavDropdown.Item>
                      <NavLink to='/perfil'>
                        <i className="bi bi-person"></i>
                        Perfil
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <a href="#" className="nav-link" onClick={() => handleNavigate()}>
                        <i className="bi bi-question-circle"></i>
                        Ajuda
                      </a>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout} >
                      <div className="d-flex ms-md-2">
                        <i className="bi bi-door-open" />
                        Sair
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}

export default Header