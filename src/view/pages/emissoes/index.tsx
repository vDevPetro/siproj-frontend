
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Emissao from "../../../model/Emissao"; 
import Table from 'react-bootstrap/Table';

const Emissao = () => {
  const { id } = useParams();
  const [historico, setHistorico] = useState<Emissao[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await getByAs(id);
              setHistorico(res);
          } catch (error) {
              console.error('Falha ao obter dados:', error);
          }
      };

      fetchData();
  }, [id]);

  return (
    <>
      <div className="pagetitle mt-5 mb-3">
        <h1>Inserir Emissões</h1>
      </div>

      <Row className="mb-3">
        <Col sm="1">
          <Form.Group controlId="formAs">
            <Form.Label>AS</Form.Label>
            <Form.Control readOnly type="text" name="as" id="as" value={id} />
          </Form.Group>
        </Col>
        <Col sm="2">
          <Form.Group controlId="formEmissao">
            <Form.Label>Emissão</Form.Label>
            <Form.Control type="text" name="emissao" id="emissao" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formMotivo">
            <Form.Label>Motivo</Form.Label>
            <Form.Select name="motivo" id="motivo">
              <option>Selecione...</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4 table-responsive">
        <Table bordered hover className="table-sm">
          <thead>
            <tr>
              <td></td>
              <th className="table-title">Emitir projeto comentário</th>
              <th className="table-title">PB comentar projeto</th>
              <th className="table-title">Atender comentários</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="table-title">Planejamento</th>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
            </tr>
            <tr>
              <th className="table-title">Replanejamento</th>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
            </tr>
            <tr>
              <th className="table-title">Realizado</th>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
              <td><Form.Control type="date" className="border-0 p-1" /></td>
              <td>< Form.Control type="date" className="border-0 p-1" /></td>
            </tr>
          </tbody>
        </Table>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form.Group controlId="formJustificativa">
            <Form.Label>Justificativa</Form.Label>
            <Form.Control as="textarea" rows={3} name="justificativa" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Label>Consultar</Form.Label>
      <hr/>
      <Row className='table-responsive'>
        <Table hover className="table-sm text-nowrap table-striped">
          <thead>
            <tr>
              <th scope="col" className="table-title">N° Emissão</th>
              <th scope="col" className="table-title">Motivo</th>
              <th scope="col" className="table-title">Situação</th>
              <th scope="col" className="table-title">Emitir Projeto LB</th>
              <th scope="col" className="table-title">Comentário Projeto LB</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item, index) => (
              <tr key={index}>
                <td>{item.num_emissao}</td>
                <td>{item.motivo}</td>
                <td>{item.flag_aprov}</td>
                <td>{item.emitir_proj_lb}</td>
                <td>{item.coment_proj_lb}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Button variant="primary" type="submit">Salvar</Button>
    </>
  )
}

export default Emissao;