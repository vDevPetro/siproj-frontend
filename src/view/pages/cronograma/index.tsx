import React, { ChangeEvent, useState } from 'react';
import { Table, Row, Col, ProgressBar, Form, Alert } from 'react-bootstrap';
import { Container } from './styles';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../controller/ConnectionFactory';
import { useParams } from 'react-router-dom';

const Cronograma = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url, SetUrl] = useState<String | null>(null);
  const { id } = useParams();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    if (!file || !id) return;

    setUploadProgress(1);
    const storageRef = ref(storage, 'cronogramas/'+id);
    const uploadTask = uploadBytesResumable(storageRef, file) ;

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setUploadProgress(0)
        console.error('Upload failed', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          SetUrl(downloadURL);
        });
      }
    );
  }

  return (
    <>
      <div className="pagetitle mt-5 mb-3">
        <h1>Cronograma</h1>
      </div>

      <Container>
        <Row className='justify-content-between my-4'>
          <Col md={4}>
            <Form.Group>
                <Form.Label>Situação da AS</Form.Label>
                <Form.Control type='text' readOnly/>
            </Form.Group>
          </Col>
          <Col md={7}>
            <Form.Group>
                <Form.Label>Arquivo do MS Project .mpp</Form.Label>
                <Form.Control type="file" accept='.mpp' onChange={handleFileChange}/>
            </Form.Group>
            <div className="d-flex">
              <button className="btn btn-success me-md-4" type='button' onClick={handleUpload}>
                <i className="bi bi-cloud-upload me-2"/> Enviar
              </button>
              <button className="btn btn-outline-success me-md-4">
                <i className="bi bi-cloud-download me-2"/> Baixar
              </button>
              <button className='btn btn-warning' type='button'>
                <i className='bi bi-arrow-repeat'/>
              </button>
            </div>
            { uploadProgress > 0 && uploadProgress < 100 &&
              <ProgressBar animated now={uploadProgress} variant='success' striped className='mt-3'/>
            }
            { url &&
              <Alert variant='success' dismissible onClose={() => SetUrl(null)} className='mt-3'>
                Cronograma enviado! Url: {url}
              </Alert>
            }
          </Col>
        </Row>
        <Row className="mb-4 table-responsive text-nowrap">
          <Table hover className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="table-title"></th>
                <th className="table-title">Linha de Base</th>
                <th className="table-title">Planejamento LB</th>
                <th className="table-title">Replanejamento</th>
                <th className="table-title">Realizado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="table-title">Data de criação AS</th>
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
      </Container>
    </>
  );
}

export default Cronograma;
