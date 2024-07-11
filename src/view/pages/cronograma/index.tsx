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
        <Row className="mb-4 table-responsive text-nowrap">
          <Table hover className="table table-striped table-bordered ">
            <thead>
              <tr>
                <th className="table-title"></th>
                <th className="table-title">Planejamento LB</th>
                <th className="table-title">Planejamento LB</th>
                <th className="table-title">Replanejamento</th>
                <th className="table-title">Realizado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="table-title">Data de criação AS</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Petrobras emitir ET</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Concluir análise ET</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Reunião pré visita</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Visita Técnica (IDA)</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Visita Técnica (VOLTA)</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir RL visita técnica</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Petrobras aprovar RL</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir orçamento</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB aprovar orçamento</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir PEP</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB aprov./ coment. PEP</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir projeto Comentário</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB comentar projeto</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Atender comentários</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB aprova Data Book</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Prazo desde aprov. PEP</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Prazo desde emissão ET</th>
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
