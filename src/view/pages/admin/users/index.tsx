import * as C from './types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../controller/ConnectionFactory';
import { FormEvent, useEffect, useState, useRef } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Usuario from '../../../../model/Usuario';
import { getUsers, updateUsers } from '../../../../controller/Users';
import { TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Users = () => {
  const [email, setEmail] = useState('');
  const [nivel, setNivel] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) return; 
    hasFetchedData.current = true;
    
    const CarregarUsers = async () => {
      setUsuarios(await getUsers());
    }

    CarregarUsers();
  }, []);

  const cadastrar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' || nivel === '') {
      setMessage('Preencha todos os campos!');
      setShowAlert(true);
    } else {
      const docRef = doc(db, "USUARIOS", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMessage('Erro ao cadastrar: Usuário já existe!');
        setShowAlert(true);
      } else {
        const dataAtual = new Date();
        await setDoc(doc(db, "USUARIOS", email), {
          nome: '',
          email: email,
          nivel: nivel,
          status: 'CADASTRADO',
          uid: 'PENDENTE',
          stamp: dataAtual.toLocaleString().split(',')[0],
          profilePhoto: ''
        }).then(async () => {
          await updateUsers();
          setMessage('Usuário cadastrado com sucesso!');
          setShowSuccess(true);
          setEmail('');
          setNivel('');
          setUsuarios(await getUsers());
        }).catch((e) => {
          setMessage('Erro ao cadastrar: ' + e.code + e.message);
          setShowAlert(true);
        })
      }
    }
  }

  return (
    <C.Container>
      <main className="container-lg">
        <div className="pagetitle mt-5 pt-1 pt-md-2">
          <h1>Usuários</h1>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-4">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cadastrar novo usuário</h5>

                  <form onSubmit={cadastrar}>
                    <div className="col-12 mb-3">
                      <TextField type='email' label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} sx={{
                        width: '100%',
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#043a00',
                        },
                        '& .MuiFormLabel-root.Mui-focused': {
                          color: '#043a00',
                        },
                      }} required />
                    </div>

                    <div className="col-12 mb-3">
                      <FormControl variant="standard" sx={{
                        width: '100%',
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#043a00',
                        },
                        '& .MuiFormLabel-root.Mui-focused': {
                          color: '#043a00',
                        },
                      }}>
                        <InputLabel id="nivel">Nível</InputLabel>
                        <Select labelId="nivel" onChange={(e: SelectChangeEvent) => setNivel(e.target.value)} required MenuProps={{
                          MenuListProps: {
                            sx: {
                              '& .MuiMenuItem-root:hover': {
                                backgroundColor: '##f2f2f2',
                              },
                            },
                          },
                        }}>
                          <MenuItem value="" ><em>Nível</em></MenuItem>
                          <MenuItem value="ADMINISTRADOR">1 - Administrador</MenuItem>
                          <MenuItem value="CONTRATADA">2 - Usuário Contratada</MenuItem>
                          <MenuItem value="PETRO">3 - Usuário Petrobras</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div className="col-12 mb-3 d-flex justify-content-between">
                      <button type="submit" className="btn btn-primary">Cadastrar</button>
                      <button type="reset" className="btn btn-secondary">Limpar</button>
                    </div>

                  </form>
                  {showAlert &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      {message}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                    </div>
                  }

                  {showSuccess &&
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle me-1"></i>
                      {message}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccess(false)}></button>
                    </div>
                  }
                </div>
              </div>

            </div>

            <div className="col-lg-8">

              <div className="card">
                <div className="card-body table-responsive-sm">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">Usuários cadastrados no sistema</h5>
                    <div className='pt-3'>
                    <button className='btn btn-outline-warning' onClick={() => updateUsers()}><i className="bi bi-arrow-repeat"/></button>
                    </div>
                  </div>
                  <table className="table table-striped table-hover ">
                    <thead>
                      <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Nível</th>
                        <th scope="col">Status</th>
                        <th scope="col">Cadastrado</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        usuarios.map((item, key) => (
                          <tr>
                            <th scope="row" >{item.email}</th>
                            <td>{item.nivel}</td>
                            <td>{item.status}</td>
                            <td>{item.stamp}</td>
                            <td>
                              <button className="btn btn-primary btn-sm me-2 edit-icon" title="Editar">
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button className="btn btn-danger btn-sm" title="Excluir">
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </C.Container>
  )
}

export default Users;