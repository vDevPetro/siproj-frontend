import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import InputMask from 'react-input-mask';
import {Container} from './styles';
import Base from "../../../model/Base";
import { getNextAvailableId, postBase } from "../../../controller/Base";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../controller/Users";
import Usuario from "../../../model/Usuario";

const InserirAs = () => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState<number | null>(null);
  const [res, setRes] = useState<any>(null);
  const [id, setId] = useState<number | null>();
  const [contrato_icj, setContratoIcj] = useState('');
  const [contrato_sap, setContratoSap] = useState('');
  const [fiscais, setFiscais] = useState('');
  const [resp_petro, setRespPetro] = useState('');
  const [resp_contr, setRespContr] = useState('');
  const [desc_projeto, setDescProj] = useState('');
  const [porte, setPorte] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const navigate = useNavigate();
  const hasFetchedData = useRef(false);
  const [respContr, setRespC] = useState<Usuario[]>([]);
  const [respPetro, setRespP] = useState<Usuario[]>([]);


  const cadastrar = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        const nova: Base = {
          id: id || 0,
          fiscais: fiscais,
          contrato_icj: contrato_icj,
          contrato_sap: contrato_sap,
          resp_contr: resp_contr,
          resp_petro: resp_petro,
          desc_projeto: desc_projeto,
          porte: porte,
          prioridade: prioridade
        }
        const response = await postBase(nova);
        setStatus(response.status);
        setRes(response.data);
        setShow(true);
      } catch (error) {
        setRes(error);
        setShow(true);
      }
  }

  useEffect(() => {
    if (hasFetchedData.current) return; 
    hasFetchedData.current = true;
    
    const fetchNextId = async () => {
      try {
        const id = await getNextAvailableId();
        setId(id);
      } catch (error) {
        console.error('Erro ao obter o próximo ID disponível:', error);
      }
    };

    const fetchUsers = async () => {
      const res = await getUsers();
      const contr = res.filter(usuario => usuario.nivel === "CONTRATADA");
      const petro = res.filter(usuario => usuario.nivel === "PETROBRAS");
      setRespC(contr.sort((a, b) => a.nome.localeCompare(b.nome)));
      setRespP(petro.sort((a, b) => a.nome.localeCompare(b.nome)));
    }

    fetchUsers();
    fetchNextId();
  }, []);

  const handleClose = () => {
    setShow(false);
    navigate('/home');
  }

  return (
      <Container className="container-lg">
          <div className="pagetitle mt-5 pt-1 pt-md-2">
            <h1>Inserir Autorização de Serviço</h1>
          </div>

          <div className="card px-2 py-1 py-md-4">
              <div className="card-body">
                  <div className="container pt-3">
                  <form onSubmit={cadastrar}>
                    <div className="row ">
                      <div className="form-group col-md-2">
                        <label htmlFor="as">AS</label>
                        <input className="form-control" type="text" readOnly id="as" name="as" value={id || ''}></input>
                      </div>                          
                      <div className="form-group col-md-5 col-lg-3">
                        <label htmlFor="contratoICJ" className="text-nowrap">Contrato ICJ</label>
                        <InputMask 
                          mask="9999.9999999.99.9"  
                          type="text" 
                          className="form-control" 
                          id="contrato_icj" 
                          name="contrato_icj" 
                          onChange={(e) => setContratoIcj(e.target.value)} 
                          value={contrato_icj} 
                          required
                        />
                      </div>
                      <div className="form-group col-md-5 col-lg-2">
                        <label htmlFor="contratoSAP" className="text-nowrap">Contrato SAP</label>
                        <InputMask 
                          mask="9999999999" 
                          type="text" 
                          className="form-control" 
                          id="contrato_sap" 
                          name="contrato_sap" 
                          onChange={(e) => setContratoSap(e.target.value)} 
                          value={contrato_sap}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mt-md-2">
                      <div className="form-group col-md-6 col-lg-5">
                        <label htmlFor="respPetrobras" className="text-nowrap">Responsável Petrobras</label>
                        <select className="form-control" id="resp_petro" name="resp_petro" onChange={(e) => setRespPetro(e.target.value)} value={resp_petro} required>
                          <option value="" selected>Selecione...</option>
                            {respPetro.map((item, key) => (
                              <option key={key} value={item.nome}>{item.nome}</option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-6 col-lg-5">
                        <label htmlFor="respRina">Responsável Rina</label>
                        <select className="form-control" id="resp_contr" name="resp_contr" onChange={(e) => setRespContr(e.target.value)} value={resp_contr} required>
                          <option selected value="" >Selecione...</option>
                          {respContr.map((item, key) => (
                            <option key={key} value={item.nome}>{item.nome}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group mt-md-2">
                      <label htmlFor="descricaoProjeto">Descrição do projeto</label>
                      <textarea className="form-control" id="desc_projeto" name="desc_projeto" rows={3} onChange={(e) => setDescProj(e.target.value)} value={desc_projeto} required></textarea>
                    </div>
                    <div className="form-group">
                      <label>Priorização</label>
                      <hr/>
                      <div className="row">
                        <div className="form-group col-md-6 col-lg-2">
                          <label htmlFor="porte">Porte</label>
                          <select className="form-control" id="porte" name="porte" onChange={(e) => setPorte(e.target.value)}  value={porte} required>
                            <option selected>Selecione</option>
                            <option value="Pequeno">Pequeno</option>
                            <option value="Médio">Médio</option>
                            <option value="Grande">Grande</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-2">
                          <label htmlFor="prioridade">Prioridade</label>
                          <select className="form-control" id="prioridade" name="prioridade" onChange={(e) => setPrioridade(e.target.value)}  value={prioridade} required>
                            <option selected>Selecione...</option>
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
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
                    <Modal show onHide={handleClose} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Autorização de Serviço cadastrada com sucesso!<br/>Identificador: {id}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button  className="btn btn-success" onClick={handleClose}>
                          Entendido
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  }
              </div>
            </div>
        </div>
      </Container>
  )
}

export default InserirAs;