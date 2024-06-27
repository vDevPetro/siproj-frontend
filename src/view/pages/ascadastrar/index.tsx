import { useState, FormEvent } from "react";
import styled from "styled-components";
import InputMask from 'react-input-mask';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../controller/ConnectionFactory";
import {Container} from './styles';

const InserirAs = () => {
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
              <h1>Inserir Autorização de Serviço</h1>
              <nav className="mt-1">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Inserir Autorização de Serviço</li>
                </ol>
              </nav>
            </div>

            <div className="card px-2 py-1 py-md-4">
                <div className="card-body">
                    <div className="container pt-3">
                    <form>
                      <div className="row ">
                        <div className="form-group col-md-2">
                          <label htmlFor="as">AS</label>
                          <input className="form-control" type="text" readOnly id="as" name="as" value={123}></input>
                        </div>                          
                        <div className="form-group col-md-5 col-lg-3">
                          <label htmlFor="contratoICJ" className="text-nowrap">Contrato ICJ</label>
                          <input type="text" className="form-control" id="contratoICJ" name="contratoICJ"/>
                        </div>
                        <div className="form-group col-md-5 col-lg-2">
                          <label htmlFor="contratoSAP">Contrato SAP</label>
                          <input type="text" className="form-control" id="contratoSAP" name="contratoSAP"/>
                        </div>
                      </div>
                      <div className="row mt-md-2">
                        <div className="form-group col-md-6 col-lg-5">
                          <label htmlFor="respPetrobras" className="text-nowrap">Responsável Petrobras</label>
                          <select className="form-control" id="respPetrobras" name="respPetrobras">
                            <option selected >Selecione...</option>
                            <option value="">Roniere/ Carlos Jesus</option>
                            <option value="">Y</option>
                            <option value="">Z</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-5">
                          <label htmlFor="respRina">Responsável Rina</label>
                          <select className="form-control" id="respRina" name="respRina">
                            <option selected >Selecione...</option>
                            <option value="">X</option>
                            <option value="">Y</option>
                            <option value="">Z</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group mt-md-2">
                        <label htmlFor="descricaoProjeto">Descrição do projeto</label>
                        <textarea className="form-control" id="descricaoProjeto" name="descricaoProjeto" rows={2}></textarea>
                      </div>
                      <div className="form-group">
                        <label>Priorização</label>
                        <hr/>
                        <div className="row">
                          <div className="form-group col-md-6 col-lg-2">
                            <label htmlFor="porte">Porte</label>
                            <select className="form-control" id="porte" name="porte">
                              <option selected>Selecione</option>
                              <option value="">Pequeno</option>
                              <option value="">Médio</option>
                              <option value="">Grande</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6 col-lg-2">
                            <label htmlFor="prioridade">Prioridade</label>
                            <select className="form-control" id="prioridade" name="prioridade">
                              <option selected>Selecione...</option>
                              <option value="">Baixa</option>
                              <option value="">Média</option>
                              <option value="">Alta</option>
                            </select>
                          </div>                      
                        </div>                  
                      </div>
                      <div className="row mt-4 flex-wrap-reverse">
                        <div className="form-group col-md-6 mt-2 mt-md-0">
                        <button type="reset" className="btn btn-outline-warning">Limpar</button>
                        </div>
                        <div className="form-group col-md-6">
                          <button type="submit" className="btn btn-primary float-right">Cadastrar</button>
                        </div>
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
          </div>
        </Container>
    )
}

export default InserirAs;