import { Container } from "./styles";
import React, {useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";
import Emissao from "../../../model/Emissao";
import { getEmissao, postEmissao, putEmissao } from "../../../controller/Emissao";
import Table from "react-bootstrap/Table";
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { useUserContext } from "../../../context/UserContext";

const convertDate = (dateString: string): string => {
  if (!dateString) return dateString;
  try {
    // Quebra a data em ano, mês e dia
    const [year, month, day] = dateString.split("-").map(Number);
    // Cria um objeto Date no formato local (ano, mês -1, dia)
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  } catch (error) {
    console.error("Invalid date format:", error);
    return dateString;
  }
};

const Emissoes = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [emissoes, setEmissoes] = useState<Emissao[]>([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState<number | null>(null);
  const [novaEmissao, setNovaEmissao] = useState<Emissao>({
    id: "",
    num_as: id || "",
    emissao: 0,
    motivo: "",
    desc_motivo: "",
    emitir_proj_lb: "",
    emitir_proj_rp: "",
    emitir_proj_real: "",
    coment_proj_lb: "",
    coment_proj_rp: "",
    coment_proj_real: "",
    atender_coment_proj_lb: "",
    atender_coment_proj_rp: "",
    atender_coment_proj_real: "",
    situacao: "",
    justificativa: "",
    log: "",
  });
  const hasFetchedData = useRef(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.nivel !== "ADMINISTRADOR") return;
    setNovaEmissao((prevState) => ({
      ...prevState,
      situacao: event.target.value,
    }));
  };

  const controlProps = (item: string) => ({
    checked: novaEmissao.situacao === item,
    onChange: handleRadioChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    const fetchData = async () => {
      try {
        const res = await getEmissao(id);
        console.log("Dados recebidos da API:", res);
        const sorted = res.sort((a, b) => a.emissao - b.emissao);
        setNovaEmissao((prevState) => ({
          ...prevState,
          emissao: sorted.length + 1,
        }));
        setEmissoes(sorted);
      } catch (error) {
        console.error("Falha ao obter dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaEmissao((prevState) => ({ ...prevState, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      novaEmissao.justificativa &&
      novaEmissao.justificativa.length < 150 &&
      user?.nivel === "CONTRATADA"
    ) {
      return alert("A justificativa deve conter no mínimo 150 caracteres.");
    }

    setLoading(true);

    try {
      if (edit) {
        const status = await putEmissao(novaEmissao, user?.nome);
        const res = await getEmissao(id);
        const sorted = res.sort((a, b) => a.emissao - b.emissao);
        setNovaEmissao((prevState) => ({
          ...prevState,
          emissao: sorted.length + 1,
        }));
        setEmissoes(sorted);
        setStatus(status.status);
      } else {
        const res = await postEmissao(novaEmissao, user?.nome);
        setEmissoes((prev) => [...prev, novaEmissao]);
        setNovaEmissao({
          id: "",
          num_as: id || "",
          emissao: 0,
          motivo: "",
          desc_motivo: "",
          emitir_proj_lb: "",
          emitir_proj_rp: "",
          emitir_proj_real: "",
          coment_proj_lb: "",
          coment_proj_rp: "",
          coment_proj_real: "",
          atender_coment_proj_lb: "",
          atender_coment_proj_rp: "",
          atender_coment_proj_real: "",
          situacao: "",
          justificativa: "",
          log: "",
        });
        setStatus(res.status);
      }
      setShow(true);
    } catch (error) {
      console.error("Falha ao cadastrar emissão:", error);
      alert("Falha ao cadastrar emissão");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Emissao) => {
    console.log("Item selecionado para edição:", item);
    setEdit(true);
    setNovaEmissao(item);
  };

  const handleClose = () => {
    setNovaEmissao({
      id: "",
      num_as: id || "",
      emissao: 0,
      motivo: "",
      desc_motivo: "",
      emitir_proj_lb: "",
      emitir_proj_rp: "",
      emitir_proj_real: "",
      coment_proj_lb: "",
      coment_proj_rp: "",
      coment_proj_real: "",
      atender_coment_proj_lb: "",
      atender_coment_proj_rp: "",
      atender_coment_proj_real: "",
      situacao: "",
      justificativa: "",
      log: "",
    });
    setNovaEmissao((prevState) => ({
      ...prevState,
      emissao: emissoes.length + 1,
    }));
    setEdit(false);
  };

  return (
    <Container>
      {emissoes.length > 0 && (
        <>
          <div className="pagetitle mt-5 mb-3">
            <h1>Consultar Emissões</h1>
          </div>
          <div className="table-responsive">
            <Table
              hover
              className="table-sm text-nowrap table-striped table-bordered table-fixed"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      color: "#043a00",
                      width: "30px",
                      textAlign: "center",
                    }}
                    className="table-title"
                  >
                    Emissão
                  </th>
                  <th
                    scope="col"
                    style={{ color: "#043a00", textAlign: "center" }}
                    className="table-title"
                  >
                    Motivo
                  </th>
                  <th
                    scope="col"
                    style={{ color: "#043a00", textAlign: "center" }}
                    className="table-title"
                  >
                    Situação
                  </th>
                  <th
                    scope="col"
                    style={{ color: "#043a00", textAlign: "center" }}
                    className="table-title"
                  >
                    Emitir Proj LB
                  </th>
                  <th
                    scope="col"
                    style={{ color: "#043a00", textAlign: "center" }}
                    className="table-title"
                  >
                    Emitir Proj Real
                  </th>
                  <th
                    scope="col"
                    style={{
                      color: "#043a00",
                      width: "30px",
                      textAlign: "center",
                    }}
                    className="table-title"
                  >
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {emissoes.map((item, index) => (
                  <tr key={index} id={item.id} onClick={() => handleEdit(item)}>
                    <td>{item.emissao}</td>
                    <td>{item.motivo}</td>
                    <td>
                      {item.situacao === "aprov"
                        ? "Aprovada"
                        : item.situacao === "aprov_coment"
                        ? "Aprov. com comentários"
                        : "Reprovada"}
                    </td>
                    <td>{convertDate(item.emitir_proj_lb)}</td>
                    <td>
                      {convertDate(
                        item.emitir_proj_real
                          ? convertDate(item.emitir_proj_real)
                          : ""
                      )}
                    </td>
                    <td>
                    {user?.nivel === "CONTRATADA" || user?.nivel === "ADMINISTRADOR" ? (
                      <button className="btn btn-success">
                        <i className="bi bi-pencil" />
                      </button>
                    ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      <div className="pagetitle mt-5 mb-3">
        <h1>{edit ? "Editar emissão" : "Inserir emissão"}</h1>
      </div>
      {edit &&
        <div className="mb-3">
          {novaEmissao?.log || "Nenhum log disponível"}
        </div>
      }
      <Form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex">
            <div className="col-sm-2">
              <label htmlFor="num_as" className="form-label">
                AS
              </label>
              <input
                type="text"
                name="num_as"
                id="num_as"
                className="form-control"
                value={novaEmissao.num_as}
                readOnly
              />
            </div>
            <div className="col-sm-2 mx-1 ms-sm-4">
              <label htmlFor="emissao" className="form-label">
                Emissão
              </label>
              <input
                type="text"
                name="emissao"
                id="emissao"
                className="form-control"
                value={novaEmissao.emissao}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          <div className="col-sm-5">
            <label htmlFor="motivo" className="form-label">
              Motivo
            </label>
            <select
              name="motivo"
              id="motivo"
              className="form-select"
              value={novaEmissao.motivo}
              onChange={handleChange}
              required
            >
              <option selected>Selecione...</option>
              <option value="Emissão Inicial">Emissão Inicial</option>
              <option value="Ajuste de padronização / Qualidade">
                Ajuste de padronização / Qualidade
              </option>
              <option value="Alteração de Escopo">Alteração de Escopo</option>
              <option value="Reprovação técnica">Reprovação técnica</option>
              <option value="Não atendimento ao escopo">
                Não atendimento ao escopo
              </option>
            </select>
          </div>
        </div>
        {loading ? (
          <Container className="d-flex justify-content-center mt-5 pt-3">
            <Spinner animation="border" role="status" variant="success">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        ) : (
          <Row className="mb-4 table-responsive">
            <Table bordered hover className="table-sm">
              <thead>
                <tr>
                  <td></td>
                  <th style={{ color: "#043a00" }} className="table-title">
                    Emitir projeto comentário
                  </th>
                  <th style={{ color: "#043a00" }} className="table-title">
                    PB comentar projeto
                  </th>
                  <th style={{ color: "#043a00" }} className="table-title">
                    Atender comentários
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style={{ color: "#043a00" }} className="table-title">
                    Planejamento
                  </th>
                  <td>
                    <Form.Control
                      type="date"
                      name="emitir_proj_lb"
                      value={novaEmissao.emitir_proj_lb}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="coment_proj_lb"
                      value={novaEmissao.coment_proj_lb}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="atender_coment_proj_lb"
                      value={novaEmissao.atender_coment_proj_lb}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#043a00" }} className="table-title">
                    Replanejamento
                  </th>
                  <td>
                    <Form.Control
                      type="date"
                      name="emitir_proj_rp"
                      value={novaEmissao.emitir_proj_rp}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="coment_proj_rp"
                      value={novaEmissao.coment_proj_rp}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="atender_coment_proj_rp"
                      value={novaEmissao.atender_coment_proj_rp}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ color: "#043a00" }} className="table-title">
                    Realizado
                  </th>
                  <td>
                    <Form.Control
                      type="date"
                      name="emitir_proj_real"
                      value={novaEmissao.emitir_proj_real}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="coment_proj_real"
                      value={novaEmissao.coment_proj_real}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="atender_coment_proj_real"
                      value={novaEmissao.atender_coment_proj_real}
                      onChange={handleChange}
                      className="border-0 p-1"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        )}
        <Row>
          {user?.nivel === "ADMINISTRADOR" && edit ? (
            <Grid
              container
              spacing={0}
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{ marginLeft: "5px" }}
            >
              <Grid
                item
                xs={2.5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px",
                }}
              >
                <FormControlLabel
                  value="aprov"
                  control={<Radio color="success" {...controlProps("aprov")} />}
                  label="Aprovado"
                  disabled={user?.nivel !== "ADMINISTRADOR"}
                />
                <FormControlLabel
                  value="repr"
                  control={<Radio color="success" {...controlProps("repr")} />}
                  label="Reprovado"
                  disabled={user?.nivel!== "ADMINISTRADOR"}
                />
              </Grid>

              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "40px",
                }}
              >
                <FormControlLabel
                  value="aprov_coment"
                  control={
                    <Radio color="success" {...controlProps("aprov_coment")} />
                  }
                  label="Aprovado com comentários"
                  disabled={user?.nivel!== "ADMINISTRADOR"}
                />
                <FormControlLabel
                  value="active"
                  control={
                    <Radio color="success" {...controlProps("active")} />
                  }
                  label="Ativo"
                  disabled={user?.nivel!== "ADMINISTRADOR"}
                />
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          {}
        </Row>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="formJustificativa">
              <Form.Label className="d-flex justify-content-between">
                Justificativa{" "}
                {novaEmissao.justificativa && (
                  <small>
                    Caractéres: {novaEmissao.justificativa?.length} | 150
                  </small>
                )}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="justificativa"
                value={novaEmissao.justificativa}
                onChange={handleChange}
                required={user?.nivel !== "CONTRATADA" ? false : true}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          <i className={`bi bi-${edit ? "floppy" : "cloud-upload"} me-2`} />
          {edit ? "Salvar" : "Inserir"}
        </Button>
        {edit && (
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-outline-warning rounded-circle ms-4"
          >
            <i className="bi bi-x-lg" />
          </button>
        )}
      </Form>

      {show && status && (
        <Modal
          show
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{status >= 200 ? "Sucesso" : "Erro"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {status === 200
              ? "Emissão alterada com sucesso"
              : "Emissão cadastrada com sucesso"}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success" onClick={() => setShow(false)}>
              Entendido
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Emissoes;
