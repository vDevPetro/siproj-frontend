import { Container } from './styles';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Emissao from '../../../model/Emissao';
import { getEmissao, postEmissao } from '../../../controller/Emissao';
import Table from 'react-bootstrap/Table';

const Emissoes = () => {
  const { id } = useParams();
  const [emissoes, setEmissoes] = useState<Emissao[]>([]);
  const [novaEmissao, setNovaEmissao] = useState<Emissao>({
    id: '',
    num_as: id || '',
    emissao: '',
    motivo: '',
    desc_motivo: '',
    emitir_projeto_lb: '',
    comentar_projeto_lb: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmissao(id);
        setEmissoes(res);
      } catch (error) {
        console.error('Falha ao obter dados:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaEmissao(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await postEmissao(novaEmissao);
      alert('Emissão cadastrada com sucesso!');
      setEmissoes(prev => [...prev, novaEmissao]);
      setNovaEmissao({
        id: '',
        num_as: id || '',
        emissao: '',
        motivo: '',
        desc_motivo: '',
        emitir_projeto_lb: '',
        comentar_projeto_lb: '',
      });
    } catch (error) {
      console.error('Falha ao cadastrar emissão:', error);
      alert('Falha ao cadastrar emissão');
    }
  };

  return (
    <Container>
      <div className="pagetitle mt-5 mb-3">
        <h1>Inserir Emissões</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col sm="1">
            <Form.Group controlId="formAs">
              <Form.Label>AS</Form.Label>
              <Form.Control readOnly type="text" name="num_as" value={novaEmissao.num_as} />
            </Form.Group>
          </Col>
          <Col sm="2">
            <Form.Group controlId="formEmissao">
              <Form.Label>Emissão</Form.Label>
              <Form.Control type="text" name="emissao" value={novaEmissao.emissao} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formMotivo">
              <Form.Label>Motivo</Form.Label>
              <Form.Select name="motivo" value={novaEmissao.motivo} onChange={handleChange}>
                <option>Selecione...</option>
                {novaEmissao && (
                  <option value={novaEmissao.motivo} selected>{novaEmissao.motivo}</option>
                )}
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
                <td><Form.Control type="date" name="emitir_projeto_lb" value={novaEmissao.emitir_projeto_lb} onChange={handleChange} className="border-0 p-1" /></td>
                <td><Form.Control type="date" name="comentar_projeto_lb" value={novaEmissao.comentar_projeto_lb} onChange={handleChange} className="border-0 p-1" /></td>
                <td><Form.Control type="date" name="atender_coment_proj_lb" value={novaEmissao.atender_coment_proj_lb} onChange={handleChange} className="border-0 p-1" /></td>
              </tr>
              <tr>
                <th className="table-title">Replanejamento</th>
                <td><Form.Control type="date" name="emitir_proj_rp" value={novaEmissao.emitir_proj_rp} onChange={handleChange} className="border-0 p-1" /></td>
                <td><Form.Control type="date" name="coment_proj_rp" value={novaEmissao.coment_proj_rp} onChange={handleChange} className="border-0 p-1" /></td>
                <td><Form.Control type="date" name="atender_coment_proj_rp" value={novaEmissao.atender_coment_proj_rp} onChange={handleChange} className="border-0 p-1" /></td>
              </tr>
              <tr>
                <th className="table-title">Realizado</th>
                <td><Form.Control type="date" name="emitir_proj_real" value={novaEmissao.emitir_proj_real} onChange={handleChange} className="border-0 p-1" /></td>
                <td><Form.Control type="date" name="coment_proj_real" value={novaEmissao.coment_proj_real} onChange={handleChange} className="border-0 p-1" /></td>
                <td><Form.Control type="date" name="atender_coment_proj_real" value={novaEmissao.atender_coment_proj_real} onChange={handleChange} className="border-0 p-1" /></td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group controlId="formJustificativa">
              <Form.Label>Justificativa</Form.Label>
              <Form.Control as="textarea" rows={3} name="justificativa" value={novaEmissao.justificativa} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">Salvar</Button>
      </Form>

      <div className="pagetitle mt-5 mb-3">
        <h1>Consultar Emissões</h1>
      </div>
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
          {emissoes.map((item, index) => (
            <tr key={index}>
              <td>{item.emissao}</td>
              <td>{item.motivo}</td>
              <td>{item.flag_aprov}</td>
              <td>{item.emitir_projeto_lb}</td>
              <td>{item.comentar_projeto_lb}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Emissoes;