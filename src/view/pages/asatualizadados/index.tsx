import { Container } from './styles'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Base from "../../../model/Base";
import { getBaseById } from '../../../controller/Base';

const AtualizarAS = () => {
const [contrato_icj, setContratoIcj] = useState('');
  const [contrato_sap, setContratoSap] = useState('');

  const { id } = useParams();
  const [as, setAs] = useState<Base>({         
    id: 0,         
    tipo: '',         
    unidade: '',        
    resp_petro: '',         
    resp_contr: '',         
    contrato_icj: '',         
    contrato_sap: '',         
    pep: '',         
    desc_projeto: '',         
    porte: '',         
    criticidade: '',        
    prioridade: '',         
    prevMes: undefined,         
    realMes: undefined,         
    prevAno: undefined,         
    realAno: undefined,         
    iefAno: undefined, 
    objetivo: '', 
    escopo: '', 
    log: '' 
  });


  useEffect(() => {
    const fetchData = async () => {
      const res = await getBaseById(id || '');
      setAs(res);
    }

    fetchData();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {         
    const { name, value } = e.target;         
    setAs(prevState => ({ ...prevState, [name]: value })); 
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(as.contrato_icj);
  }

  return (
   <Container id="main" className="main">
      <div className="pagetitle">
        <h1>Atualizar dados</h1>
        <Breadcrumb className="mt-1">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Atualizar Dados AS</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="card px-2 py-1 py-md-4">
        <div className="card-body">
          
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="1">
                    <Form.Group controlId="formAs">
                      <Form.Label>AS</Form.Label>
                      <Form.Control readOnly type="text" name="as" id="as" value={id} />
                    </Form.Group>
                  </Col>
                  <Col sm="1">
                    <Form.Group controlId="formTipo">
                      <Form.Label className="text-nowrap">Tipo</Form.Label>
                      <Form.Control type="text" name="tipo" value={as.tipo} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formDescProjeto">
                      <Form.Label className="text-nowrap">Descrição do Projeto</Form.Label>
                      <Form.Control as="textarea" rows={1} name="escopo_projeto" value={as?.desc_projeto}/>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formRespPetro">
                      <Form.Label className="text-nowrap">Responsável Petrobras</Form.Label>
                      <Form.Select name="resp_petro" id="resp_petro" onChange={handleChange}>
                        <option>Selecione...</option>
                        {as && (
                          <option value={as.resp_petro} selected>{as.resp_petro}</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRespRina">
                      <Form.Label className="text-nowrap">Responsável Rina</Form.Label>
                      <Form.Select>
                        <option>Selecione...</option>
                        {as && (
                          <option value={as.resp_contr} selected>{as.resp_contr}</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formContratoIcj">
                      <Form.Label className="text-nowrap">Contrato ICJ</Form.Label>
                      <InputMask 
                          mask="9999.9999999.99.9"  
                          type="text" 
                          className="form-control" 
                          id="contrato_icj" 
                          name="contrato_icj" 
                          onChange={(e) => setContratoIcj(e.target.value)} 
                          value={as.contrato_icj}
                          required
                        />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formContrato">
                      <Form.Label>Contrato SAP</Form.Label>
                      <InputMask 
                          mask="9999999999" 
                          type="text" 
                          className="form-control" 
                          id="contrato_sap" 
                          name="contrato_sap" 
                          onChange={(e) => setContratoSap(e.target.value)} 
                          value={as.contrato_sap}
                          required
                        />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                <Col sm="3">
                    <Form.Group controlId="formIdGep">
                      <Form.Label>ID GEP</Form.Label>
                      <Form.Control type="text" name="pep" value={as.pep} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                  <Col sm="2">
                    <Form.Group controlId="formPorte">
                      <Form.Label>Tipo GEP</Form.Label>
                      <Form.Select>
                        <option>Selecione...</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm="2">
                    <Form.Group controlId="formPe">
                      <Form.Label>PEP</Form.Label>
                      <Form.Control type="text" name="unidade" value={as.unidade} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Label>Priorização</Form.Label>
                <hr/>
                <Row className="mb-3">
                  <Col sm="2">
                    <Form.Group controlId="formPorte">
                      <Form.Label>Porte</Form.Label>
                      <Form.Select>
                        <option>Selecione...</option>
                        {as && (
                          <option value={as.porte} selected>{as.porte}</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm="2">
                    <Form.Group controlId="formCriticidade">
                      <Form.Label>Criticidade</Form.Label>
                      <Form.Select>
                        <option>Selecione...</option>
                        {as && (
                          <option value={as.criticidade} selected>{as.criticidade}</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm="2">
                    <Form.Group controlId="formPrioridade">
                      <Form.Label>Prioridade</Form.Label>
                      <Form.Select>
                      <option>Selecione...</option>
                      {as && (
                        <option value={as.prioridade} selected>{as.prioridade}</option>
                      )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Label>Avanço Físico</Form.Label>
                <hr/>
                <Row>
                  <Col>
                    <Form.Group controlId="formPrevMes">
                      <Form.Label className="text-nowrap">Previsão Mês %</Form.Label>
                      <Form.Control type="text" name="prev_mes" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRealMes">
                      <Form.Label className="text-nowrap">Real Mês %</Form.Label>
                      <Form.Control type="text" name="real_mes" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formIefMes">
                      <Form.Label className="text-nowrap">IEF Mês %</Form.Label>
                      <Form.Control type="text" name="ief_mes" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPrevAno">
                      <Form.Label className="text-nowrap">Previsão Ano %</Form.Label>
                      <Form.Control type="text" name="prev_ano" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRealAno">
                      <Form.Label className="text-nowrap">Real Ano %</Form.Label>
                      <Form.Control type="text" name="real_ano"  />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formIefAno">
                      <Form.Label className="text-nowrap">IEF Ano %</Form.Label>
                      <Form.Control type="text" name="ief_ano"  />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formObjetivoProjeto">
                      <Form.Label className="text-nowrap">Objetivo do Projeto</Form.Label>
                      <Form.Control as="textarea" rows={3} name="objetivo_projeto" value={as?.objetivo}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formEscopoProjeto">
                      <Form.Label>Escopo do Projeto</Form.Label>
                      <Form.Control as="textarea" rows={3} name="escopo_projeto" value={as?.escopo}/>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">Salvar</Button>
              </Form>
          </div>
        </div>
      
    </Container>
  )
}

export default AtualizarAS;