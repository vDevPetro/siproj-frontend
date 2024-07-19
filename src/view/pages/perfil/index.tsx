import { Container } from './styles';
import { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../../context/UserContext";
import { auth } from "../../../controller/ConnectionFactory";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Alert } from "react-bootstrap";

const Perfil = () => {
    const { user } = useUserContext();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [hide, setHide] = useState(true);

    
    const handleChangePassword = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Senhas não coincidem!');
            return;
        }
        
        const user = auth.currentUser;

        if (user) {
            try {
                const credential = EmailAuthProvider.credential(user.email!, currentPassword);

                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);
                setSuccess('Senha atualizada com sucesso!');
                setError(null);
            } catch (error: any) {
                if (error.message === 'Firebase: Error (auth/requires-recent-login).') {
                    setError('Para alterar a senha voce precisa ter logado recentemente. Saia e entre novamente.');
                    setSuccess(null);
                } else {
                    setError(error.message);
                    setSuccess(null);
                }                
            }
        } else {
            setError('Erro: não foi possivel identificar o usuário logado!');
            setSuccess(null);
        }
    };

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
                <div className="mt-4">
                    <h4>Alterar Senha <i className={`ms-2 bi bi-eye${hide ? '-slash' : ''}`} onClick={() => setHide(!hide   )}/></h4>
                    <form onSubmit={handleChangePassword}>
                        <div className="row mt-2">
                            <label className="col-4 col-form-label text-end">Senha atual:</label>
                            <div className="col-8">
                                <input type={hide ? 'password' : 'text'} name="old" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mt-md-2">
                            <label className="col-4 col-form-label text-end">Senha nova:</label>
                            <div className="col-8">
                                <input type={hide ? 'password' : 'text'} name="old" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mt-md-2">
                            <label className="col-4 col-form-label text-end">Repetir:</label>
                            <div className="col-8">
                                <input type={hide ? 'password' : 'text'} name="old" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mt-md-3 px-3">
                            <button type="submit" className="btn btn-primary"><i className="bi bi-floppy me-2" />Alterar</button>
                        </div>
                    </form>
                </div>
                <div className="mt-2">
                    {success &&
                        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                            {success}
                        </Alert>
                    }
                    {error &&
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
                        </Alert>
                    }
                </div>
            </div>
        </Container>
    )
}

export default Perfil;