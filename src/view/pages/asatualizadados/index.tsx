import { Container } from './styles'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import Base from "../../../model/Base";



const GridBasicExample = () => {


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
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(nova);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNova(prevNova => ({
      ...prevNova,
      [name]: value
    }));
  };

  return (
   <Container id="main" className="main">
      <div className="pagetitle">
        <h1>ATT</h1>
        <Breadcrumb className="mt-1">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>ATT</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="card px-2 py-1 py-md-4">
        <div className="card-body">
          
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="formAs">
                      <Form.Label>AS</Form.Label>
                      <Form.Control type="text" name="as" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRespPetro">
                      <Form.Label className="text-nowrap">Responsável Petrobras</Form.Label>
                      <Form.Control type="text" name="resp_petro" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRespRina">
                      <Form.Label className="text-nowrap">Responsável Rina</Form.Label>
                      <Form.Control type="text" name="resp_contr" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formContratoIcj">
                      <Form.Label className="text-nowrap">Contrato ICJ</Form.Label>
                      <Form.Control type="text" name="contrato_icj" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formContrato">
                      <Form.Label>Contrato</Form.Label>
                      <Form.Control type="text" name="contrato_sap" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formIdGep">
                      <Form.Label>ID GEP</Form.Label>
                      <Form.Control type="text" name="pep" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formTipoDe">
                      <Form.Label>Tipo de</Form.Label>
                      <Form.Control type="text" name="tipo" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPe">
                      <Form.Label>PE</Form.Label>
                      <Form.Control type="text" name="unidade" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formDescProjeto">
                      <Form.Label className="text-nowrap">Descrição do Projeto</Form.Label>
                      <Form.Control type="text" name="desc_projeto" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formPorte">
                      <Form.Label>Porte</Form.Label>
                      <Form.Select aria-label="">
                        <option>Selecione...</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formCriticidade">
                      <Form.Label>Criticidade</Form.Label>
                      <Form.Select aria-label="">
                        <option>Selecione...</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPrioridade">
                      <Form.Label>Prioridade</Form.Label>
                      <Form.Control as="select" name="prioridade" onChange={handleChange}>
                        <option value="">Selecione...</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formPrevMes">
                      <Form.Label>Previsão Mês %</Form.Label>
                      <Form.Control type="text" name="prev_mes" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRealMes">
                      <Form.Label>Real Mês %</Form.Label>
                      <Form.Control type="text" name="real_mes" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formIefMes">
                      <Form.Label>IEF Mês %</Form.Label>
                      <Form.Control type="text" name="ief_mes" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formPrevAno">
                      <Form.Label>Previsão Ano %</Form.Label>
                      <Form.Control type="text" name="prev_ano" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formRealAno">
                      <Form.Label>Real Ano %</Form.Label>
                      <Form.Control type="text" name="real_ano" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formIefAno">
                      <Form.Label>IEF Ano %</Form.Label>
                      <Form.Control type="text" name="ief_ano" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formObjetivoProjeto">
                      <Form.Label className="text-nowrap">Objetivo do Projeto</Form.Label>
                      <Form.Control as="textarea" rows={3} name="objetivo_projeto" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formEscopoProjeto">
                      <Form.Label>Escopo do Projeto</Form.Label>
                      <Form.Control as="textarea" rows={3} name="escopo_projeto" onChange={handleChange} />
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

export default GridBasicExample;