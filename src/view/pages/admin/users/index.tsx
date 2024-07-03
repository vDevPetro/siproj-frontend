import * as C from './types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../controller/ConnectionFactory';
import { FormEvent, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Usuario from '../../../../model/Usuario';
import { getUsers } from '../../../../controller/Users';
import { TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

const Users = () => {
    const [email, setEmail] = useState('');
    const [nivel, setNivel] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        const CarregarUsers = async() => {
            setUsuarios(await getUsers());
        }

        CarregarUsers();
    }, []);

    const cadastrar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email === '' || nivel === ''){
            setMessage('Preencha todos os campos!');
            setShowAlert(true);
        } else {
                const docRef = doc(db, "USUARIOS", email);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()){
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

    return(
        <C.Container>
            <main id="main" className="main">
                <div className="pagetitle">
                <h1>Usuários</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Usuários</li>
                    </ol>
                </nav>
                </div>

                <section className="section">
                <div className="row">
                    <div className="col-lg-4">

                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Cadastrar novo usuário</h5>

                        <form onSubmit={cadastrar}>
                            <div className="col-12 mb-3">
                                <TextField type='email' label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} sx={{width: '100%'}} required/>
                            </div>
                            
                            <div className="col-12 mb-3">
                                <FormControl variant="standard" sx={{width: '100%'}}>
                                    <InputLabel id="nivel">Nível</InputLabel>
                                    <Select labelId="nivel" onChange={(e: SelectChangeEvent) => setNivel(e.target.value)} required>
                                        <MenuItem value="" ><em>Nível</em></MenuItem>
                                        <MenuItem value="ADMINISTRADOR">1 - Administrador</MenuItem>
                                        <MenuItem value="OPERACIONAL">2 - Usuário Operacional</MenuItem>
                                        <MenuItem value="CLIENTE">3 - Usuário Cliente</MenuItem>
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
                        <h5 className="card-title">Usuários cadastrados no sistema</h5>

                        <table className="table table-striped table-hover ">
                            <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Nível</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado</th>
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