import { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../../context/UserContext";

const Container = styled.div`
    font-family: Nunito;
    padding: 2rem 0;

    .profile-card {
        border-radius: 1.5rem;
        padding: 1.5rem 1.25rem;
        background: #fff;
        box-shadow:  7px 7px 28px #d4d9d1,
                    -7px -7px 28px #ffffff;
    }
`;

const Perfil = () => {
    const { user, loading, error } = useUserContext();
    const [showSenha, setShowSenha] = useState(false);
    const [showExcluir, setShowExcluir] = useState(false);

    return (
        <Container className="container-lg d-flex justify-content-center">
            <div className="col-11 col-sm-8 col-md-5 profile-card d-flex flex-column align-items-center">
                <div className="profile-photo">
                    {user?.profilePhoto !== "" ? 
                        <></> 
                        : 
                        <></>
                    }
                </div>
                <h2>Perfil</h2>
                <div className="col-12">
                    <hr></hr>
                </div>
                <table>
                    <tr>
                        <td className="text-end"><b>Nome: </b></td>
                        <td>{user?.nome}</td>
                    </tr>
                    <tr>
                        <td className="text-end"><b>Email: </b></td>
                        <td>{user?.email}</td>
                    </tr>
                    <tr>
                        <td className="text-end"><b>Nível: </b></td>
                        <td>{user?.nivel}</td>
                    </tr>
                    <tr>
                        <td className="text-end"><b>Cadastro: </b></td>
                        <td>{user?.stamp}</td>
                    </tr>
                    <tr>
                        <td className="text-end"><b>Status: </b></td>
                        <td>{user?.status}</td>
                    </tr>
                </table>
                <div className="col-12">
                    <hr></hr>
                </div>
                <div className="d-flex">
                    <button className="btn btn-success me-md-2" onClick={() => {setShowExcluir(false);setShowSenha(true)}}>Alterar senha</button>
                    <button className="btn btn-danger" onClick={() => {setShowSenha(false);setShowExcluir(true)}}>Excluir conta</button>
                </div>
                {showSenha &&
                    <div className="mt-4">
                        <h4>Alterar Senha</h4>
                        <form>
                            <div className="row mt-2">
                                <label className="col-4 col-form-label text-end">Senha atual:</label>
                                <div className="col-8">
                                    <input type="password" name="old" className="form-control"/>
                                </div>
                            </div>
                            <div className="row mt-md-2">
                                <label className="col-4 col-form-label text-end">Senha nova:</label>
                                <div className="col-8">
                                    <input type="password" name="old" className="form-control"/>
                                </div>
                            </div>
                            <div className="row mt-md-2">
                                <label className="col-4 col-form-label text-end">Repetir:</label>
                                <div className="col-8">
                                    <input type="password" name="old" className="form-control"/>
                                </div>
                            </div>
                            <div className="row mt-md-3 px-3">
                                <button type="submit" className="btn btn-primary"><i className="bi bi-floppy me-2" />Alterar</button>
                            </div>
                        </form>
                    </div>
                }
                {showExcluir &&
                    <div className="mt-4">
                        <h4>Excluir conta</h4>
                        <p>Digite seu e-mail para confirmar a exclusão</p>
                        <form>
                            <div className="row">
                                <label className="col-4 col-form-label text-end">E-mail:</label>
                                <div className="col-8">
                                    <input type="email" name="email" className="form-control"/>
                                </div>
                            </div>
                            <div className="row mt-md-3 px-3">
                                <button type="submit" className="btn btn-danger"><i className="bi bi-trash me-2" />Excluir</button>
                            </div>
                        </form>
                    </div>   
                }
            </div>
        </Container>
    )
}

export default Perfil;