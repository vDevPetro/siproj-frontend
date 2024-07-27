import { Container } from './styles';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Base from "../../../model/Base";
import { getBaseById, updateBase } from '../../../controller/Base';
import fiscais from '../../../data/fiscais.json';
import CurvaS from '../../components/curvas';
import resp_contr from '../../../data/resp_contr.json';
import unidades from '../../../data/unidades.json';
import { useUserContext } from '../../../context/UserContext';
import { Modal, Spinner } from 'react-bootstrap';
import { Slider } from '@mui/material';
import IefChart from '../../components/iefchart';

const AtualizarAS = () => {
  const [status, SetStatus] = useState<number | null>(null);
  const [show, SetShow] = useState(false);
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  const { id } = useParams();
  const [as, setAs] = useState<Base>({
    id: 0,
    tipo: '',
    unidade: '',
    fiscais: '',
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
    iefMes: undefined,
    objetivo: '',
    escopo: '',
    log: ''
  });

  const porteMarks = [
    {
      value: 1,
      label: 'Pequeno'
    },
    {
      value: 2,
      label: 'Médio',
    },
    {
      value: 3,
      label: 'Grande',
    },
  ];

  const criticidadeMarks = [
    {
      value: 1,
      label: 'Baixa',
    },
    {
      value: 2,
      label: 'Média',
    },
    {
      value: 3,
      label: 'Alta',
    },
  ];

  const prioridadeMarks = [
    {
      value: 1,
      label: 'Baixa',
    },
    {
      value: 2,
      label: 'Média',
    },
    {
      value: 3,
      label: 'Alta',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBaseById(id || '');
      setAs(res);
    }

    fetchData();
    setLoading(false);
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAs(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePorteChange = (event: Event, value: number | Array<any>, activeThumb: number) => {
    if (typeof value === 'number') {
      const mark = porteMarks.find(mark => mark.value === value);
      if (mark) {
        setAs(prevState => ({ ...prevState, porte: mark.label }));
      }
    }
  };

  const handlePrioridadeChange = (event: Event, value: number | Array<any>, activeThumb: number) => {
    if (typeof value === 'number') {
      const mark = prioridadeMarks.find(mark => mark.value === value);
      if (mark) {
        setAs(prevState => ({ ...prevState, prioridade: mark.label }));
      }
    }
  };

  const handleCriticidadeChange = (event: Event, value: number | Array<any>, activeThumb: number) => {
    if (typeof value === 'number') {
      const mark = criticidadeMarks.find(mark => mark.value === value);
      if (mark) {
        setAs(prevState => ({ ...prevState, criticidade: mark.label }));
      }
    }
  };

  const getRangeValue = (name: string) => {
    if(name === 'porte') {
      if(as.porte === 'Pequeno') {
        return 1;
      }
      else if (as.porte === 'Médio') {
        return 2;
      }
      else if (as.porte === 'Grande') {
        return 3;
      } else {
        return 0;
      }
    }
    else if (name === 'criticidade') {
      if(as.criticidade === 'Baixa') {
        return 1;
      }
      else if (as.criticidade === 'Média') {
        return 2;
      }
      else if (as.criticidade === 'Alta') {
        return 3;
      } else {
        return 0;
      }
    } else {
      if(as.prioridade === 'Baixa') {
        return 1;
      }
      else if (as.prioridade === 'Média') {
        return 2;
      }
      else if (as.prioridade === 'Alta') {
        return 3;
      } else {
        return 0;
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updated: Base = {
        id: Number(id) | 0,
        tipo: as.tipo,
        unidade: as.unidade,
        fiscais: as.fiscais,
        resp_petro: as.resp_petro,
        resp_contr: as.resp_contr,
        contrato_icj: as.contrato_icj,
        contrato_sap: as.contrato_sap,
        pep: as.pep,
        desc_projeto: as.desc_projeto,
        porte: as.porte,
        criticidade: as.criticidade,
        prioridade: as.prioridade,
        objetivo: as.objetivo,
        escopo: as.escopo
      }
      const response = await updateBase(updated, user?.email || '')
      SetStatus(response.status);
      SetShow(true);
    } catch (error) {
      setRes(error);
      SetShow(true);
    }
  }

  if(as.id === 0 || loading) {
    return(
      <div className='d-flex justify-content-center mt-5 pt-3'>
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <Container>
      <div className="pagetitle mt-5 mb-4">
        <h1>Atualizar dados</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="4" sm="2" xl="1">
            <Form.Group controlId="formAs">
              <Form.Label>AS</Form.Label>
              <Form.Control readOnly type="text" name="id" id="id" value={id} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col xs="4" sm="2" xl="1">
            <Form.Group controlId="formTipo">
              <Form.Label className="text-nowrap">Tipo</Form.Label>
              <Form.Control type="text" name="tipo" id="tipo" value={as.tipo} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col className='mt-2 mt-sm-0'>
            <Form.Group controlId="formDescProjeto">
              <Form.Label className="text-nowrap">Descrição do Projeto</Form.Label>
              <Form.Control as="textarea" rows={1} id="desc_projeto" name="desc_projeto" value={as?.desc_projeto} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2 mt-sm-0 mb-3">
          <Col xs="6" md="4">
            <Form.Group controlId="formFiscais">
              <Form.Label className="text-nowrap">Fiscal</Form.Label>
              <Form.Select name="fiscais" id="fiscais" value={as.fiscais} onChange={handleChange}>
                <option>Selecione...</option>
                {fiscais
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((resp, index) => (
                  <option key={index} >{resp.nome}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="6" md="4">
            <Form.Group controlId="formRespPetro">
              <Form.Label className="text-nowrap">Responsável Petrobras</Form.Label>
              <Form.Select name="resp_petro" id="resp_petro" value={as.resp_petro} onChange={handleChange}>
                <option>Selecione...</option>
                {/* {resp_petro
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((resp, index) => (
                  <option key={index} > {resp.nome}</option>
                ))} */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className='mt-2 mt-md-0' md="4">
            <Form.Group controlId="resp_contr">
              <Form.Label className="text-nowrap">Responsável Rina</Form.Label>
              <Form.Select name="resp_contr" id="resp_contr" value={as.resp_contr} onChange={handleChange}>
                <option>Selecione...</option>
                {resp_contr
                 .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((resp, index) => (
                  <option key={index} >{resp.nome}</option>
                ))} 
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs="6" md="5" lg="3" >
            <Form.Group controlId="formContratoIcj">
              <Form.Label className="text-nowrap">Contrato ICJ</Form.Label>
              <InputMask
                mask="9999.9999999.99.9"
                type="text"
                className="form-control"
                id="contrato_icj"
                name="contrato_icj"
                onChange={handleChange}
                value={as.contrato_icj}
                required
                readOnly
              />
            </Form.Group>
          </Col>
          <Col xs="6" md="5" lg="3">
            <Form.Group controlId="formContrato">
              <Form.Label className="text-nowrap">Contrato SAP</Form.Label>
              <InputMask
                mask="9999999999"
                type="text"
                className="form-control"
                id="contrato_sap"
                name="contrato_sap"
                onChange={handleChange}
                value={as.contrato_sap}
                required
                readOnly
              />
            </Form.Group>
          </Col>
          <Col xs="4" sm="2" xxl="1">
            <Form.Group controlId="formIdGep">
              <Form.Label>ID GEP</Form.Label>
              <Form.Control type="text" name="id_gep" id="id_gep" value='' onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col xs="8" sm="10" md="4" xxl="2">
            <Form.Group controlId="formPorte">
              <Form.Label>Tipo GEP</Form.Label>
              <Form.Select id="tipo_gep">
                <option>Selecione...</option>
                <option>Paradas</option>
                <option>Adequações</option>
                <option>Corretivas de Grande Porte</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="8" sm="7" md="5" lg="4" xxl="3">
            <Form.Group controlId="formPep">
              <Form.Label>PEP</Form.Label>
              <Form.Control type="text" id="pep" name="pep" value={as.pep} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col xs="4" sm="5" md="3" xxl="2">
            <Form.Group controlId="formUnidade">
              <Form.Label>Unidade</Form.Label>
              <Form.Select name="unidade" id="unidade" value={as.unidade} onChange={handleChange}>
                <option>Selecione...</option>
                {unidades
                  .sort((a, b) => a.unidade.localeCompare(b.unidade))
                  .map((resp, index) => (
                    <option key={index} value={resp.unidade}>{resp.unidade}</option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Label className='mt-4'>Priorização</Form.Label>
        <hr />
        <Row className="mb-3 px-5 justify-content-between">
          <Col md="3">
            <Form.Group controlId="formPorte">
              <Form.Label>Porte</Form.Label>
              <Slider marks={porteMarks} step={1} min={1} max={3} color='success' onChange={handlePorteChange} name="porte" value={getRangeValue("porte")}/>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="formCriticidade">
              <Form.Label>Criticidade</Form.Label>
              <Slider marks={criticidadeMarks} step={1} min={1} max={3} color='success' onChange={handleCriticidadeChange} name="criticade" value={getRangeValue("criticidade")}/>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="formPrioridade">
              <Form.Label>Prioridade</Form.Label>
              <Slider marks={prioridadeMarks} step={1} min={1} max={3} color='success' onChange={handlePrioridadeChange} name="prioridade" value={getRangeValue("prioridade")}/>
            </Form.Group>
          </Col>
        </Row>

        <Form.Label className='mt-4'>Avanço Físico</Form.Label>
        <hr />
        <Row>
          <Col md="8"  className='mb-3'>
            <div className='d-flex flex-column' style={{width: '100%', height: '20rem'}}>
              <CurvaS/>
            </div>
          </Col>
          <Col md="4">
              <IefChart />
          </Col>
          {/* <Col>
            <Form.Group controlId="formPrevMes">
              <Form.Label className="text-nowrap">Previsão Mês %</Form.Label>
              <Form.Control type="text" name="prev_mes" id="prev_mes" readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formRealMes">
              <Form.Label className="text-nowrap">Real Mês %</Form.Label>
              <Form.Control type="text" name="real_mes" id="real_mes" readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formIefMes">
              <Form.Label className="text-nowrap">IEF Mês %</Form.Label>
              <Form.Control type="text" name="ief_mes" id="ief_mes" readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPrevAno">
              <Form.Label className="text-nowrap">Previsão Ano %</Form.Label>
              <Form.Control type="text" name="prev_ano" id="prev_ano" readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formRealAno">
              <Form.Label className="text-nowrap">Real Ano %</Form.Label>
              <Form.Control type="text" name="real_ano" id="real_ano" readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formIefAno">
              <Form.Label className="text-nowrap">IEF Ano %</Form.Label>
              <Form.Control type="text" name="ief_ano" id="ief_ano" readOnly />
            </Form.Group>
          </Col> */}
        </Row>

        <Row className='mt-4'>
          <Col xs="12" lg="6">
            <Form.Group controlId="formObjetivo">
              <Form.Label className="text-nowrap">Objetivo do Projeto</Form.Label>
              <Form.Control as="textarea" rows={3} name="objetivo" id="objetivo" value={as?.objetivo} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col xs="12" lg="6">
            <Form.Group controlId="formEscopoProjeto">
              <Form.Label>Escopo do Projeto</Form.Label>
              <Form.Control as="textarea" rows={3} name="escopo" id="escopo" value={as?.escopo} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit"><i className="bi bi-floppy me-2"/>Salvar</Button>
      </Form>

                  
      {show && status === 200 &&
        <Modal show onHide={() => SetShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Autorização de Serviço atualizada com sucesso!<br />Identificador: {id}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success" onClick={() => SetShow(false)}>
              Entendido
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </Container>
  )
}

export default AtualizarAS;