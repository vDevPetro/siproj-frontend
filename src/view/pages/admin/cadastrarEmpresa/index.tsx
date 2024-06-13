import { useState, FormEvent } from "react";
import styled from "styled-components";
import InputMask from 'react-input-mask';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../controller/ConnectionFactory";

const Container = styled.main`
`

const CadastrarEmpresa = () => {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [contratoicj, setContratoicj] = useState('');
    const [contratoSap, setContratoSap] = useState('');
    const [cliente, setCliente] = useState('');
    const [objeto, setObjeto] = useState('');
    const [contato, setContato] = useState('');
    const [telefone, setTelefone] = useState('');
    const [familia, setFamilia] = useState('');
    const [inicioContrato, setIncioContrato] = useState('');
    const [fimContrato, setFimcontrato] = useState('');
    const [valorContrato, setValorContrato] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const limpar = () => {
        setCnpj('');
        setTelefone('');
    }

    const cadastrar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cnpj === '' || valorContrato === '') {
            setMessage('Preencha todos os campos!');
            setShow(true);
        } else {
            await addDoc(collection(db, "BASE"), {
                nome: nome,
                cnpj: cnpj,
                contrato_icj: contratoicj,
                contrato_sap: contratoSap,
                cliente: cliente,
                objeto: objeto,
                contato: contato,
                telefone: telefone,
                familia: familia,
                inicio_contrato: inicioContrato,
                termino_contrato: fimContrato,
                valor_contrato: valorContrato
            }).then(async () => {
                setMessage('Empresa cadastrada com sucesso!');
                setShowSuccess(true);
            }).catch((e) => {
                setMessage('Erro ao cadastrar: ' + e.code + e.message);
                setShow(true);
            });
        }
    }

    return (
        <Container id="main" className="main">
            <div className="pagetitle">
                <h1>Cadastrar empresa</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">Contrato</li>
                        <li className="breadcrumb-item active">Cadastrar empresa</li>
                    </ol>
                </nav>
            </div>

            <div className="card px-2 py-1 px-md-4 py-md-2">
                <div className="card-body">
                    <h5 className="card-title">Inserir nova empresa</h5>

                    <form className="row g-3" onSubmit={cadastrar}>
                        <div className="col-md-5">
                            <label htmlFor="nome" className="form-label">Nome fantasia</label>
                            <input type="text" className="form-control" id="nome" onChange={(e) => setNome(e.target.value)}/>
                        </div>
                        <div className="col-7 col-md-3">
                            <label htmlFor="cnpj" className="form-label">CNPJ</label>
                            <InputMask mask="99.999.999/9999-99" className="form-control" id="cnpj" onChange={(e) => setCnpj(e.target.value)} required/>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="contrato_icj" className="form-label">Contrato ICJ</label>
                            <input type="text" className="form-control" id="contrato_icj" onChange={(e) => setContratoicj(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="contrato_sap" className="form-label">Contrato SAP</label>
                            <input type="text" className="form-control" id="contrato_sap" placeholder="" onChange={(e) => setContratoSap(e.target.value)} required/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cliente" className="form-label">Cliente</label>
                            <input type="text" className="form-control" id="cliente" placeholder="" onChange={(e) => setCliente(e.target.value)}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="objeto" className="form-label">Objeto</label>
                            <input type="text" className="form-control" id="objeto" onChange={(e) => setObjeto(e.target.value)}/>
                        </div>
                        <div className="col-md-6 col-lg-5">
                            <label htmlFor="contato" className="form-label">Contato</label>
                            <input type="text" className="form-control" id="contato" onChange={(e) => setContato(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <InputMask mask="(99)99999-9999" className="form-control" id="telefone" onChange={(e) => setTelefone(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-5">
                            <label htmlFor="familia" className="form-label">Familia</label>
                            <input type="text" className="form-control" id="familia" onChange={(e) => setFamilia(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <label htmlFor="inicio_contrato" className="form-label">Início do contrato</label>
                            <input type="date" className="form-control" id="inicio_contrato" onChange={(e) => setIncioContrato(e.target.value)} required/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <label htmlFor="termino_contrato" className="form-label">Término do contrato</label>
                            <input type="date" className="form-control" id="termino_contrato" onChange={(e) => setFimcontrato(e.target.value)} required/>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <label htmlFor="valor_contrato" className="form-label">Valor do contrato</label>
                            <div className="input-group">
                                <span className="input-group-text">R$</span>
                                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" id="valor_contrato" onChange={(e) => setValorContrato(e.target.value.toString())} required/>
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                            <button type="submit" className="btn btn-primary me-2">Cadastrar</button>
                            <button type="reset" className="btn btn-outline-secondary" onClick={(e) => limpar}>Limpar</button>
                        </div>
                    </form>
                    {show &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            {message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
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
        </Container>
    )
}

export default CadastrarEmpresa;