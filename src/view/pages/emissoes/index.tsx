import { Container } from './styles';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import Emissao from '../../../model/Emissao';
import { getEmissao, postEmissao } from '../../../controller/Emissao';
import Table from 'react-bootstrap/Table';

const convertDate = (dateString: string): string => {
  if (!dateString) return dateString; 
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (error) {
    console.error('Invalid date format:', error);
    return dateString; 
  }
};

const Emissoes = () => {
  const { id } = useParams();
  const [emissoes, setEmissoes] = useState<Emissao[]>([]);
  const [edit, setEdit] = useState<Emissao | null>(null);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState<number | null>(null);
  const [novaEmissao, setNovaEmissao] = useState<Emissao>({
    id: '',
    num_as: id || '',
    emissao: 0,
    motivo: '',
    desc_motivo: '',
    emitir_projeto_lb: '',
    comentar_projeto_lb: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmissao(id);
        const sorted = res.sort((a, b) => a.emissao - b.emissao)
        setNovaEmissao(prevState => ({ ...prevState, emissao: sorted.length + 1}))
        setEmissoes(sorted);
      } catch (error) {
        console.error('Falha ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaEmissao(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await postEmissao(novaEmissao);
      setEmissoes(prev => [...prev, novaEmissao]);
      setNovaEmissao({
        id: '',
        num_as: id || '',
        emissao: emissoes.length + 1,
        motivo: '',
        desc_motivo: '',
        emitir_projeto_lb: '',
        comentar_projeto_lb: '',
      });
      setStatus(res.status);
      setShow(true);
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
        <div className='d-flex justify-content-between mb-3'>
          <div className="d-flex">
            <div className='col-sm-2'>
              <label htmlFor="num_as" className="form-label">AS</label>
              <input type="text" name="num_as" id="num_as" className="form-control" value={novaEmissao.num_as} readOnly/>
            </div>
            <div className='col-sm-2 ms-4'>
              <label htmlFor="emissao" className="form-label">Emissão</label>
              <input type="text" name="emissao" id="emissao" className="form-control" value={novaEmissao.emissao} onChange={handleChange} readOnly/>
            </div>
          </div>
          <div className='col-sm-5'>
              <label htmlFor="motivo" className="form-label">Motivo</label>
              <select name="motivo" id="motivo" className="form-select" value={novaEmissao.motivo} onChange={handleChange}>

              </select>
            </div>
        </div>

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

      {show && status === 201 &&
        <Modal show onHide={() => setShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {novaEmissao.emissao}ª Emissão para a AS {id} cadastrada com sucesso!
          </Modal.Body>
          <Modal.Footer>
            <Button  className="btn btn-success" onClick={() => setShow(false)}>
              Entendido
            </Button>
          </Modal.Footer>
        </Modal>
      }

      {emissoes.length > 0 && 
        <>
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
                <tr key={index} id={item.id} onClick={() => {}}>
                  <td>{item.emissao}</td>
                  <td>{item.motivo}</td>
                  <td>{item.flag_aprov}</td>
                  <td>{convertDate(item.emitir_projeto_lb)}</td>
                  <td>{convertDate(item.comentar_projeto_lb)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      }
    </Container>
  );
};

export default Emissoes;