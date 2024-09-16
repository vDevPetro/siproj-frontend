import { Container } from "./styles";
import { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../../context/UserContext";
import { auth } from "../../../controller/ConnectionFactory";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Alert } from "react-bootstrap";

const Perfil = () => {
  const { user } = useUserContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hide, setHide] = useState(true);

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Senhas não coincidem!");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email!,
          currentPassword
        );

        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
        setSuccess("Senha atualizada com sucesso!");
        setError(null);
      } catch (error: any) {
        if (error.message === "Firebase: Error (auth/requires-recent-login).") {
          setError(
            "Para alterar a senha voce precisa ter logado recentemente. Saia e entre novamente."
          );
          setSuccess(null);
        }
        if (error.message === "Firebase: Error (auth/missing-password).") {
            setError(
              "Preencha todos os campos de senha requisitados!"
            );
            setSuccess(null);
          }
         else {
          setError(error.message);
          setSuccess(null);
        }
      }
    } else {
      setError("Erro: não foi possivel identificar o usuário logado!");
      setSuccess(null);
    }
  };

  return (
    <Container className="container-lg d-flex justify-content-center">
      <div className="col-11 col-sm-8 col-md-5 profile-card d-flex flex-column align-items-center">
        <div className="profile-photo">
          {user?.profilePhoto !== "" ? <></> : <></>}
        </div>
        <h2>Perfil</h2>
        <div className="col-12">
          <hr></hr>
        </div>
        <table className="table-perfil">
          <tr>
            <td>
              <b>Nome:</b>
            </td>
            <td>{user?.nome}</td>
          </tr>
          <tr>
            <td>
              <b>Email:</b>
            </td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>
              <b>Nível:</b>
            </td>
            <td>{user?.nivel}</td>
          </tr>
          <tr>
            <td>
              <b>Cadastro:</b>
            </td>
            <td>{user?.stamp}</td>
          </tr>
          <tr>
            <td>
              <b>Status:</b>
            </td>
            <td>{user?.status}</td>
          </tr>
        </table>

        <div className="col-12">
          <hr></hr>
        </div>
        <div className="mt-4 container-profile">
          <h3>Alterar Senha</h3>
          <form onSubmit={handleChangePassword}>
            <div className="row mt-3">
              <label className="col-4 col-form-label form-label-profile">
                Senha atual:
              </label>
              <div className="col-8 input-container-profile">
                <input
                  type={hide ? "password" : "text"}
                  name="old"
                  className="form-control form-control-profile"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <i
                  className={`bi bi-eye${hide ? "-slash" : ""}`}
                  onClick={() => setHide(!hide)}
                />
              </div>
            </div>

            <div className="row mt-3">
              <label className="col-4 col-form-label form-label-profile">
                Senha nova:
              </label>
              <div className="col-8 input-container-profile">
                <input
                  type={hide ? "password" : "text"}
                  name="new"
                  className="form-control form-control-profile"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i
                  className={`bi bi-eye${hide ? "-slash" : ""}`}
                  onClick={() => setHide(!hide)}
                />
              </div>
            </div>

            <div className="row mt-3">
              <label className="col-4 col-form-label form-label-profile">
                Repetir:
              </label>
              <div className="col-8 input-container-profile">
                <input
                  type={hide ? "password" : "text"}
                  name="confirm"
                  className="form-control form-control-profile"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i
                  className={`bi bi-eye${hide ? "-slash" : ""}`}
                  onClick={() => setHide(!hide)}
                />
              </div>
            </div>

            <div className="row mt-3 px-3">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-floppy me-2" />
                Alterar
              </button>
            </div>
          </form>
        </div>
        <div className="mt-2">
          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(null)}
              dismissible
            >
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Perfil;
