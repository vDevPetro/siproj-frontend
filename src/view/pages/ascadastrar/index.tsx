import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import InputMask from 'react-input-mask';
import { addDoc, collection } from "firebase/firestore";
import {Container} from './styles';
import Base from "../../../model/Base";
import { getNextAvailableId, postBase } from "../../../controller/Base";

const InserirAs = () => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState<number | null>(null);
  const [res, setRes] = useState<any>(null);
  const [nova, setNova] = useState<Base>({
    id: 0, 
    tipo: '',
    unidade: '',
    resp_petro: '',
    resp_contr: '',
    contrato_icj: '',
    contrato_sap: '',
    pep: '',
    desc_projeto: '',
    porte: ''
  });

    const cadastrar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
          alert('aqui')
          const response = await postBase(nova);
          alert(response.status)
          setStatus(response.status);
          setRes(response.data);
          setShow(true);
        } catch (error) {
          setRes(error);
          setShow(true);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNova(prevNova => ({
        ...prevNova,
        [name]: value
      }));
    };

    useEffect(() => {
      const fetchNextId = async () => {
        try {
          const id = await getNextAvailableId();
          setNova(prevNova => ({ ...prevNova, id }));
        } catch (error) {
          console.error('Erro ao obter o próximo ID disponível:', error);
        }
      };
  
      fetchNextId();
    }, []);

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
                    <form onSubmit={cadastrar}>
                      <div className="row ">
                        <div className="form-group col-md-2">
                          <label htmlFor="as">AS</label>
                          <input className="form-control" type="text" readOnly id="as" name="as" value={nova.id}></input>
                        </div>                          
                        <div className="form-group col-md-5 col-lg-3">
                          <label htmlFor="contratoICJ" className="text-nowrap">Contrato ICJ</label>
                          <input type="text" className="form-control" id="contrato_icj" name="contrato_icj" onChange={handleChange}/>
                        </div>
                        <div className="form-group col-md-5 col-lg-2">
                          <label htmlFor="contratoSAP" className="text-nowrap">Contrato SAP</label>
                          <input type="text" className="form-control" id="contrato_sap" name="contrato_sap" onChange={handleChange}/>
                        </div>
                      </div>
                      <div className="row mt-md-2">
                        <div className="form-group col-md-6 col-lg-5">
                          <label htmlFor="respPetrobras" className="text-nowrap">Responsável Petrobras</label>
                          <select className="form-control" id="resp_petro" name="resp_petro" onChange={handleChange}>
                            <option selected >Selecione...</option>
                            <option value="">Roniere/ Carlos Jesus</option>
                            <option value="">Y</option>
                            <option value="">Z</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-5">
                          <label htmlFor="respRina">Responsável Rina</label>
                          <select className="form-control" id="resp_contr" name="resp_contr" onChange={handleChange}>
                            <option selected >Selecione...</option>
                            <option value="">X</option>
                            <option value="">Y</option>
                            <option value="">Z</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group mt-md-2">
                        <label htmlFor="descricaoProjeto">Descrição do projeto</label>
                        <textarea className="form-control" id="desc_projeto" name="desc_projeto" rows={3} onChange={handleChange}></textarea>
                      </div>
                      <div className="form-group">
                        <label>Priorização</label>
                        <hr/>
                        <div className="row">
                          <div className="form-group col-md-6 col-lg-2">
                            <label htmlFor="porte">Porte</label>
                            <select className="form-control" id="porte" name="porte" onChange={handleChange}>
                              <option selected>Selecione</option>
                              <option value="">Pequeno</option>
                              <option value="">Médio</option>
                              <option value="">Grande</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6 col-lg-2">
                            <label htmlFor="prioridade">Prioridade</label>
                            <select className="form-control" id="prioridade" name="prioridade" onChange={handleChange}>
                              <option selected>Selecione...</option>
                              <option value="">Baixa</option>
                              <option value="">Média</option>
                              <option value="">Alta</option>
                            </select>
                          </div>                      
                        </div>                  
                      </div>
                      <div className="row mt-4 justify-content-between">
                        <div className="form-group col-md-2">
                          <button type="submit" className="btn btn-primary float-right">Cadastrar</button>
                        </div>
                        <div className="form-group col-md-2 mt-2 mt-md-0">
                          <button type="reset" className="btn btn-outline-warning">Limpar</button>
                        </div>
                      </div>
                    </form>
        
                    {show && status === 500 &&
                      <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {res}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                      </div>
                    }
                    {show && status === 201 &&
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="bi bi-check-circle me-1"></i>
                        {res}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                      </div>
                    }
                </div>
              </div>
          </div>
        </Container>
    )
}

export default InserirAs;