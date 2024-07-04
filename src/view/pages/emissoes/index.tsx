import { Container } from './styles'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Base from "../../../model/Base";
import { getBaseById } from '../../../controller/Base';
import Table from 'react-bootstrap/Table';


const Emissao = () => {

  return (
    <>
      <div className="pagetitle mt-5 mb-3">
        <h1>Inserir Emissões</h1>
      </div>

      <Row className="mb-3">
        <Col sm="1">
          <Form.Group controlId="formAs">
            <Form.Label>AS</Form.Label>
            <Form.Control readOnly type="text" name="as" id="as" />
          </Form.Group>
        </Col>
        <Col sm="2">
          <Form.Group controlId="">
            <Form.Label>Emissão</Form.Label>
            <Form.Control type="text" name="emissão" id="emissão" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="">
            <Form.Label>Motivo</Form.Label>
            <Form.Select>
              <option>Selecione...</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Table bordered hover className="table-sm">
          <thead>
            <tr>
              <td></td>
              <th>Emitir projeto comentário</th>
              <th>PB comentar projeto</th>
              <th>Atender comentários</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Planejamento</th>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
            </tr>
            <tr>
              <th>Replanejamento</th>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
            </tr>
            <tr>
            <th>Realizado</th>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
              <td><Form.Control type="date" className="border-0 p-1"/></td>
            </tr>
          </tbody>
        </Table>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form.Group controlId="formEscopoProjeto">
            <Form.Label>Justificativa</Form.Label>
            <Form.Control as="textarea" rows={3} name="descrição" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Label>Consultar</Form.Label>
      <hr/>
      <Row className='table-responsive'>
        <Table hover className="table-sm text-nowrap table-striped">
          <thead>
            <tr>
              <th>N° Emissão</th>
              <th>Motivo</th>
              <th>Situação</th>
              <th>Emitir Projeto LB</th>
              <th>Comentário Projeto LB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor</td>
              <td>Aprovada</td>
              <td>12/02/2024</td>
              <td>30/02/2024</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Lorem ipsum</td>
              <td>Aprovada</td>
              <td>30/03/2023</td>
              <td>03/30/3003</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Lorem ipsum dolor sit amet</td>
              <td>Reprovada</td>
              <td>12/12/1212</td>
              <td>11/11/1111</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Button variant="primary" type="submit">Salvar</Button>
    </>
  )
}

export default Emissao;