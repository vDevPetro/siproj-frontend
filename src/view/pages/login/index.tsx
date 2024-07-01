import * as C from './styles'
import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import { auth, db } from '../../../controller/ConnectionFactory';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

const Login = () => {
    const [user, setUser] = useState<User>();
    const [inputType, setInputType] = useState('password');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const [nome, setNome] = useState('');
    const [message, setMessage] = useState('');    
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [logar, setLogar] = useState(true);
    const [hide, setHide] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }
        })

    }, []);

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email === '' || senha === ''){
            setMessage('Preencha todos os campos!');
            setShowAlert(true);
        } else {
            await signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
               // navigate('/home');
            }).catch((e) => {
                if(e.code === 'auth/too-many-requests'){
                    setMessage('Muitas tentativas!');
                    setShowAlert(true);
                }
                else if(e.code === 'auth/invalid-credential'){
                    setMessage('E-mail ou senha incorretos!');
                    setShowAlert(true);
                }      
                else if(e.code === 'auth/invalid-email'){
                    setMessage('Insira um email valido!');
                    setShowAlert(true);
                }
                else {
                    setMessage(e.message);
                    setShowAlert(true);
                }
            })
        }
    }

    const registrar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email === '' || senha === '' || senha2 === '' || nome === '') {
            setMessage('Preencha todos os campos!');
            setShowAlert(true);
        } else {
            if(senha !== senha2){
                setMessage('Senhas não coincidem!');
                setShowAlert(true);
            } else {
                const docRef = doc(db, "USUARIOS", email);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()){
                    await createUserWithEmailAndPassword(auth, email, senha).then(async (userCredential) => {
                        await updateDoc(docRef, {
                            nome: nome,
                            status: 'ATIVO',
                            uid: userCredential.user.uid,
                            profilePhoto: ''
                        })                                            
                        setShowAlert2(true);
                        setMessage('Usuário cadastrado com sucesso!');
                    }).catch((e) => {
                        if(e.code === 'auth/email-already-in-use'){
                            setMessage('Email já cadastrado!');
                            setShowAlert(true);
                        }   
                        if(e.code === 'auth/weak-password'){
                            setMessage('Sua senha deve conter no minimo 6 caracteres!');
                            setShowAlert(true);
                        }
                        if(e.code === 'auth/invalid-email'){
                            setMessage('Insira um e-mail valido!');
                            setShowAlert(true);
                        }
                    })
                } else {
                    setShowAlert(true);
                    setMessage('Email não liberado para cadastro!');
                }
            } 
        }
    }

    if (logar) {
        return(
            <C.Container className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
    
                        <div className="d-flex justify-content-center py-4">
                            
                        </div>
    
                        <div className="card mb-3 px-1 px-sm-2 px-lg-4 pb-2">
    
                            <div className="card-body">
    
                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Entre na sua conta</h5>
                                    <p className="text-center small">Insira o email e senha para logar.</p>
                                </div>
    
                                <form className="row g-3 needs-validation" onSubmit={login}>
                                    <div className="col-12">
                                        <label htmlFor="yourUsername" className="form-label">Email</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                                            <input 
                                                type="text" 
                                                name="username" 
                                                className="form-control" 
                                                id="email" 
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <div className="invalid-feedback">Please enter your username.</div>
                                        </div>
                                    </div>
    
                                    <div className="col-12">
                                        <label htmlFor="yourPassword" className="form-label">Senha</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-lock"></i></span>
                                            <input 
                                                type={`${hide ? 'password' : 'text'}`} 
                                                name="password" 
                                                className="form-control" 
                                                id="senha" 
                                                required
                                                onChange={(e) => setSenha(e.target.value)}
                                            />
                                            <div className="invalid-feedback">Please enter your password!</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" onClick={() => setHide(!hide)}/>
                                            <label className="form-check-label" htmlFor="rememberMe">Exibir senha</label>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <button className="btn btn-success w-100" type="submit">Login</button>
                                    </div>
                                    <div className="col-12">
                                        <p className="small mb-0">Primeiro login? <a href='#' onClick={() => setLogar(!logar)}>Clique aqui</a></p>
                                    </div>
                                    {showAlert && 
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {message}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(!showAlert)}></button>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
    
                        </div>
                    </div>
                    </div>
    
                </section>
            </C.Container>
        )    
    } else {
        return(
            <C.Container>
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                        <div className="d-flex justify-content-center py-4">
                            
                        </div>

                        <div className="card mb-3 px-1 px-sm-2 px-lg-4 pb-2">

                            <div className="card-body">

                            <div className="pt-4 pb-2">
                                <h5 className="card-title text-center pb-0 fs-4">Crie sua conta</h5>
                                <p className="text-center small">Insira seus dados para finalizar o cadastro</p>
                            </div>

                            <form className="row g-3 needs-validation mb-3" onSubmit={registrar}>
                                <div className="col-12">
                                <label htmlFor="yourEmail" className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" id="yourEmail" required onChange={(e) => setEmail(e.target.value)}/>
                                <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                                </div>

                                <div className="col-12">
                                <label htmlFor="yourName" className="form-label">Nome</label>
                                <input type="text" name="name" className="form-control" id="yourName" required onChange={(e) => setNome(e.target.value)}/>
                                <div className="invalid-feedback">Please, enter your name!</div>
                                </div>

                                <div className="col-12">
                                <label htmlFor="yourUsername" className="form-label">Senha</label>
                                <div className="input-group">
                                    <input type={`${hide ? 'password' : 'text'}`}  className="form-control" required onChange={(e) => setSenha(e.target.value)}/>
                                    <span className="input-group-text" id="basic-addon2" onClick={() => setHide(!hide)}><i className={`bi bi-eye${hide ? '-slash':''}`} ></i></span>
                                </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="yourPassword" className="form-label">Repetir a senha</label>
                                    <div className="input-group">
                                        <input type={`${hide ? 'password' : 'text'}`}  className="form-control" required onChange={(e) => setSenha2(e.target.value)}/>
                                        <span className="input-group-text" id="basic-addon2" onClick={() => setHide(!hide)}><i className={`bi bi-eye${hide ? '-slash':''}`}></i></span>
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <button className="btn btn-primary w-100" type="submit">Criar conta</button>
                                </div>
                                <div className="col-12">
                                    <p className="small mb-0">Já possui conta? <a href="#" onClick={() => setLogar(!logar)}>Logar</a></p>
                                </div>
                            </form>
                            {showAlert && 
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {message}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(!showAlert)}></button>
                                </div>
                            }
                            {showAlert2 &&
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {message}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert2(!showAlert2)}></button>
                                </div>
                            }
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>

                </section>
            </C.Container>
        )
    }    
}

export default Login;