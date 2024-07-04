import React from 'react';
import { Container, Table, Row, Col, Button, Form } from 'react-bootstrap';
import './styles';

const Cronograma = () => {

  return (
    <>
      <div className="pagetitle mt-5 mb-3">
        <h1>Cronograma</h1>
      </div>

      <Container>
        <Row className="mb-4 table-responsive">
          <Table hover className=" table-striped">
            <thead>
              <tr>
                <th   className="table-title"></th>
                <th   className="table-title">Data da criação da AS</th>
                <th   className="table-title">Petrobras emitir ET</th>
                <th   className="table-title">Concluir análise ET</th>
                <th   className="table-title">Reunião pré visita</th>
                <th   className="table-title">Visita Técnica (IDA)</th>
                <th   className="table-title">Visita Técnica (VOLTA)</th>
                <th   className="table-title">Emitir RL visita técnica</th>
                <th   className="table-title">Petrobras aprovar RL</th>
                <th   className="table-title">Emitir orçamento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="table-title text-nowrap">Planejamento LB</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Replanejamento</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Realizado</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <Row className="mb-4 table-responsive">
          <Table hover className="table-striped">
            <thead>
              <tr>
                <th className="table-title"></th>
                <th className="table-title">PB aprovar orçamento</th>
                <th className="table-title">Emitir PEP</th>
                <th className="table-title">PB aprov./ coment. PEP</th>
                <th className="table-title">Emitir projeto Comentário</th>
                <th className="table-title">PB comentar projeto</th>
                <th className="table-title">Atender comentários</th>
                <th className="table-title">PB aprova Data Book</th>
                <th className="table-title">Prazo desde aprov. PEP</th>
                <th className="table-title">Prazo desde emissão ET</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="table-title text-nowrap">Planejamento LB</th>
                <td></td>
                <td>11/11/1111</td>
                <td>11/11/1111</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Replanejamento</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Realizado</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group controlId="situacaoAS">
              <Form.Label>Situação da AS</Form.Label>
              <Form.Control as="textarea" rows={3} name="situacaoas" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Salvar</Button>
      </Container>
    </>
  );
}

export default Cronograma;
