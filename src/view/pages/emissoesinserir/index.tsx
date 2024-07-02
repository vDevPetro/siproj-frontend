import { Container } from './styles'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Base from "../../../model/Base";
import { getBaseById } from '../../../controller/Base';
import Table from 'react-bootstrap/Table';


const InserirEmissao = () => {

  return (
    <Container id="main" className="main">
      <div className="pagetitle">
        <h1>Inserir Emissões</h1>
        <Breadcrumb className="mt-1">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Inserir Emissões</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="card px-2 py-1 py-md-4">
        <div className="card-body">

          <Row className="mb-3">
            <Col sm="1">
              <Form.Group controlId="formAs">
                <Form.Label>AS</Form.Label>
                <Form.Control readOnly type="text" name="as" id="as" />
              </Form.Group>
            </Col>
            <Col>
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
                <th>Username</th>
                  <td><Form.Control type="date" className="border-0 p-1"/></td>
                  <td><Form.Control type="date" className="border-0 p-1"/></td>
                  <td><Form.Control type="date" className="border-0 p-1"/></td>
                </tr>
              </tbody>
            </Table>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formEscopoProjeto">
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} name="descrição" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">Salvar</Button>
        </div>
      </div>
    </Container>
  )
}

export default InserirEmissao