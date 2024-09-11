import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Table, Row, Col, ProgressBar, Form, Alert } from 'react-bootstrap';
import { Container } from './styles';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../controller/ConnectionFactory';
import { useParams } from 'react-router-dom';
import { updateUrl } from '../../../controller/Cronograma';
import CronogramaModel from '../../../model/Cronograma';
import { getCronogramaByAs } from '../../../controller/Cronograma';
import { Spinner } from "react-bootstrap";

const Cronograma = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Number | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [cronograma, setCronograma] = useState<CronogramaModel[] | null>(null);
  const { id } = useParams();
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) return; 
    hasFetchedData.current = true;

    const fetchData = async () => {
      const res = await getCronogramaByAs(id || '');
      setCronograma(res);
      if (res) {
        setUrl(res[0].url);
      }
    }

    fetchData();
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  const sendUpdate = async (url: string) => {
    try {
      if (id && url) {
        
        const res = await updateUrl(id, url);
        setStatus(res.status);
        setResponse(res.data);
      }      
    } catch (error) {
      console.error('Erro no componente ao enviar url:', error);
    }
  }

  const handleUpload = () => {
    if (!file || !id) return;

    setUploadProgress(1);
    const storageRef = ref(storage, 'cronogramas/'+id+'.mpp');
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
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setUrl(downloadURL);
          setFile(undefined);
          sendUpdate(downloadURL);
        });
        
      }
    );
  }

  if(!cronograma) {
    return (
      <Container className="d-flex justify-content-center mt-5 pt-3">
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
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
                <Form.Control type='text' value={cronograma[0].situacao} readOnly/>
            </Form.Group>
          </Col>
          <Col md={7}>
            <Form.Group>
                <Form.Label>Arquivo do MS Project .mpp - {url ? 'Cronograma armazenado' : 'Cronograma ausente' }</Form.Label>
                <Form.Control type="file" accept='.mpp' onChange={handleFileChange} />
            </Form.Group>
            <div className="d-flex">
              <button className="btn btn-success me-2 me-md-4" type='button' onClick={handleUpload}>
                <i className="bi bi-cloud-upload me-2"/> Enviar
              </button>
              { url ? 
                <a href={url || undefined} className="btn btn-outline-success me-2 me-md-4" download >
                  <i className="bi bi-cloud-download me-2" /> Baixar
                </a> 
                : 
                <a href="https://firebasestorage.googleapis.com/v0/b/siproj2-5ff69.appspot.com/o/padrao%2FCR%20-%20XXX-AS-PB%20-%20REV%3D0.mpp?alt=media&token=db1c3958-09ed-4e04-b045-c4e846df5399" className="btn btn-outline-success me-2 me-md-4" download >
                  <i className="bi bi-cloud-download me-2" /> Baixar padrão
                </a> 
              }        
            </div>
            { uploadProgress > 0 && uploadProgress < 100 &&
              <ProgressBar animated now={uploadProgress} variant='success' striped className='mt-3'/>
            }
            { status === 200  &&
              <Alert variant='success' dismissible onClose={() => setUrl(null)} className='mt-3'>
                Cronograma enviado!
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
                <th className="table-title">Replanejamento</th>
                <th className="table-title">Realizado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="table-title">Data de criação AS</th>
                <td colSpan={3}>{cronograma[0]?.criacao}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Petrobras emitir ET</th>
                <td>{cronograma[0].emissao_et_petro_lb}</td>
                <td>{cronograma[0]?.emissao_et_petro_rp}</td>
                <td>{cronograma[0]?.emissao_et_petro_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Concluir análise ET</th>
                <td>{cronograma[0]?.analise_et_lb}</td>
                <td>{cronograma[0]?.analise_et_rp}</td>
                <td>{cronograma[0]?.analise_et_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Reunião pré visita</th>
                <td>{cronograma[0]?.reuniao_pre_lb}</td>
                <td>{cronograma[0]?.reuniao_pre_rp}</td>
                <td>{cronograma[0]?.reuniao_pre_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Visita Técnica (VOLTA)</th>
                <td>{cronograma[0].visita_volta_lb}</td>
                <td>{cronograma[0]?.visita_volta_rp}</td>
                <td>{cronograma[0]?.visita_volta_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir RL visita técnica</th>
                <td>{cronograma[0].emitir_rl_visita_lb}</td>
                <td>{cronograma[0]?.emitir_rl_visita_rp}</td>
                <td>{cronograma[0]?.emitir_rl_visita_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Petrobras aprovar RL</th>
                <td>{cronograma[0].aprovar_rl_visita_lb}</td>
                <td>{cronograma[0]?.aprovar_rl_visita_rp}</td>
                <td>{cronograma[0]?.aprovar_rl_visita_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir orçamento</th>
                <td>{cronograma[0].emitir_orc_lb}</td>
                <td>{cronograma[0].emitir_orc_rp}</td>
                <td>{cronograma[0]?.emitir_orc_real}</td>
              </tr>
              <tr>
                <th scope="row" className={`table-title ${cronograma[0].aprovar_orc_na === "1" ? 'text-decoration-line-through' : ''}`}>PB aprovar orçamento {cronograma[0].aprovar_orc_na === "1" ? <i className='bi bi-slash-circle ms-2'/> : <></>}</th>
                <td>{cronograma[0].aprovar_orc_lb}</td>
                <td>{cronograma[0].aprovar_orc_rp}</td>
                <td>{cronograma[0]?.aprovar_orc_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir PEP</th>
                <td>{cronograma[0].emitir_pep_lb}</td>
                <td>{cronograma[0].emitir_pep_rp}</td>
                <td>{cronograma[0]?.emitir_pep_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Comentar PEP</th>
                <td>{cronograma[0]?.comentar_pep_lb}</td>
                <td>{cronograma[0]?.comentar_pep_rp}</td>
                <td>{cronograma[0]?.comentar_pep_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Atender PEP</th>
                <td>{cronograma[0]?.atender_pep_lb}</td>
                <td>{cronograma[0]?.atender_pep_rp}</td>
                <td>{cronograma[0]?.atender_pep_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB aprov./ coment. PEP</th>
                <td>{cronograma[0].aprovar_pep_lb}</td>
                <td>{cronograma[0].aprovar_pep_rp}</td>
                <td>{cronograma[0]?.aprovar_pep_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir projeto Comentário</th>
                <td>{cronograma[0].emitir_projeto_lb}</td>
                <td>{cronograma[0]?.emitir_projeto_rp}</td>
                <td>{cronograma[0]?.emitir_projeto_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB comentar projeto</th>
                <td>{cronograma[0].comentar_projeto_lb}</td>
                <td>{cronograma[0]?.comentar_projeto_rp}</td>
                <td>{cronograma[0]?.comentar_projeto_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Atender comentários</th>
                <td>{cronograma[0].atender_coment_projeto_lb}</td>
                <td>{cronograma[0]?.atender_coment_projeto_rp}</td>
                <td>{cronograma[0]?.atender_coment_projeto_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Aprovar projetos</th>
                <td>{cronograma[0]?.aprovar_projeto_lb}</td>
                <td>{cronograma[0]?.aprovar_projeto_rp}</td>
                <td>{cronograma[0]?.aprovar_projeto_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Emitir Databook</th>
                <td>{cronograma[0]?.emitir_databook_lb}</td>
                <td>{cronograma[0]?.emitir_databook_rp}</td>
                <td>{cronograma[0]?.emitir_databook_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Comentar Databook</th>
                <td>{cronograma[0]?.comentar_databook_lb}</td>
                <td>{cronograma[0]?.comentar_databook_rp}</td>
                <td>{cronograma[0]?.comentar_databook_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Atender comentários</th>
                <td>{cronograma[0].atender_coment_projeto_lb}</td>
                <td>{cronograma[0]?.atender_coment_projeto_rp}</td>
                <td>{cronograma[0]?.atender_coment_projeto_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">PB aprova Data Book</th>
                <td>{cronograma[0].data_book_lb}</td>
                <td>{cronograma[0]?.data_book_rp}</td>
                <td>{cronograma[0]?.data_book_real}</td>
              </tr>
              <tr>
                <th scope="row" className="table-title">Prazo desde aprov. PEP</th>
                <td>{cronograma[0].prazo_lb}</td>
                <td>{cronograma[0].prazo_rp}</td>
                <td>{cronograma[0].prazo_real}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}

export default Cronograma;
