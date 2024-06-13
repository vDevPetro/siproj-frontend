import { useState, useEffect, useRef, FormEvent } from "react";
import MUIDataTable from 'mui-datatables';
import styled from "styled-components";
import { getEmpresas } from "../../../../controller/Empresas";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../controller/ConnectionFactory";
import InputMask from 'react-input-mask';
import { Responsive } from "mui-datatables";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";

const Container = styled.main`
    h6 {
        font-family: 'Poppins';
    }
    table div {
        font-family: 'Open sans';
        font-size: 1rem;
    }
    p {
        margin-bottom: 0rem;
    }
    .MuiFormGroup-root {
        padding: 1rem !important;
    }
`;

const BuscarEmpresa = () => {
    const layout: Responsive = "simple";
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: false,
                display: false,
                draggable: false,
            }
        },
        {
            name: "nome",
            label: "Nome",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "cnpj",
            label: "CNPJ",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "contratoicj",
            label: "Contrato ICJ",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "contratosap",
            label: "Contrato Sap",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "cliente",
            label: "Cliente",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "contato",
            label: "Contato",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "iniciocontrato",
            label: "Início do Contato",
            options: {
                filter: true,
                sort: true,
                display: true
            }
        },
        {
            name: "fimcontrato",
            label: "Fim do Contrato",
            options: {
                filter: true,
                sort: true,
                display: true
            }
        },
        {
            name: "valorcontrato",
            label: "Valor do Contrato",
            options: {
                filter: true,
                sort: true,
                display: true
            }
        }
    ];
       
    const options = {
        elevation: 0,  
        draggableColumns: {
            enabled: true
        },
        resizableColumns: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 25],
        searchOpen: true,
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        onRowClick: (rowData: string[], rowMeta: {dataIndex: number, rowIndex: number}) => {
            if (rowData[0].length === 20) {
                CarregarEmpresa(rowData[0])
            }
        },
        responsive: layout,
    }

    const [empresas, setEmpresas] = useState([{}]);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [contratoicj, setContratoicj] = useState('');
    const [contratoSap, setContratoSap] = useState('');
    const [cliente, setCliente] = useState('');
    const [objeto, setObjeto] = useState('');
    const [contato, setContato] = useState('');
    const [telefone, setTelefone] = useState('');
    const [familia, setFamilia] = useState('');
    const [inicioContrato, setIncioContrato] = useState('');
    const [fimContrato, setFimcontrato] = useState('');
    const [valorContrato, setValorContrato] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [load, setLoad] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const CarregarEmpresas = async() => {
            setEmpresas(await getEmpresas());
        }

        CarregarEmpresas();
        
    }, []);
       
    const CarregarEmpresa = async(id: string) => {
        setId(id);
        const docRef = doc(db, 'BASE', id);
        await getDoc(docRef).then(async(docSnap: any) => {
            setNome(docSnap.data().nome);
            setCnpj(docSnap.data().cnpj);
            setContratoicj(docSnap.data().contrato_icj);
            setContratoSap(docSnap.data().contrato_sap);
            setCliente(docSnap.data().cliente);
            setObjeto(docSnap.data().objeto);
            setContato(docSnap.data().contato);
            setTelefone(docSnap.data().telefone);
            setIncioContrato(docSnap.data().inicio_contrato);
            setFimcontrato(docSnap.data().termino_contrato);
            setValorContrato(docSnap.data().valor_contrato);
            setFamilia(docSnap.data().familia);

            setLoad(true);
        }).catch((e) => {
            setMessage('Erro ao carregar empresa:' + e.code + e.message);
            setShow(true);
        })
    }

    const editar = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const docRef = doc(db, "BASE", id);
        await updateDoc(docRef, {
            cliente: cliente,
            cnpj: cnpj,
            contato: contato,
            contrato_icj: contratoicj,
            contrato_sap: contratoSap,
            familia: familia,
            inicio_contrato: inicioContrato,
            nome: nome,
            objeto: objeto,
            telefone: telefone,
            termino_contrato: fimContrato,
            valor_contrato: valorContrato
        }).then(async() => {
            setMessage('Empresa atualizada com sucesso!');
            setShowSuccess(true);
            setLoad(false);
            setEmpresas(await getEmpresas());
        }).catch((e) => {
            setMessage('Erro ao atualizar empresa:' + e.code)
            setShow(true)
        })
    }

    const alternar = () => {
        setShowSuccess(false);
        setLoad(false);
    }

    const excluir = async() => {
        await deleteDoc(doc(db, "BASE", id)).then(async() => {
            setMessage('Empresa excluída com sucesso!');
            setShowSuccess(true);
            setLoad(false);
            setOpenDialog(false);
            setEmpresas(await getEmpresas());
        }).catch((e) => {
            setMessage('Erro ao excluir empresa: ' + e.code);
            setShow(true);
        });
    }

    return(
        <Container id="main" className="main">
            <div className="pagetitle">
                <h1>Buscar empresa</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">Contrato</li>
                        <li className="breadcrumb-item active">Buscar empresa</li>
                    </ol>
                </nav>
            </div>
            {load && 
            <div className="card px-2 py-1 px-md-4 py-md-2">
                <div className="card-body">
                    <h5 className="card-title">Editar empresa</h5>

                    <form className="row g-3" onSubmit={editar}>
                        <div className="col-md-5">
                            <label htmlFor="nome" className="form-label">Nome fantasia</label>
                            <input type="text" className="form-control" id="nome" defaultValue={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>
                        <div className="col-7 col-md-3">
                            <label htmlFor="cnpj" className="form-label">CNPJ</label>
                            <InputMask mask="99.999.999/9999-99" className="form-control" id="cnpj" defaultValue={cnpj} onChange={(e) => setCnpj(e.target.value)} required/>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="contrato_icj" className="form-label">Contrato ICJ</label>
                            <input type="text" className="form-control" id="contrato_icj" defaultValue={contratoicj} onChange={(e) => setContratoicj(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="contrato_sap" className="form-label">Contrato SAP</label>
                            <input type="text" className="form-control" id="contrato_sap" placeholder="" defaultValue={contratoSap} onChange={(e) => setContratoSap(e.target.value)} required/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cliente" className="form-label">Cliente</label>
                            <input type="text" className="form-control" id="cliente" placeholder="" defaultValue={cliente} onChange={(e) => setCliente(e.target.value)}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="objeto" className="form-label">Objeto</label>
                            <input type="text" className="form-control" id="objeto" defaultValue={objeto} onChange={(e) => setObjeto(e.target.value)}/>
                        </div>
                        <div className="col-md-6 col-lg-5">
                            <label htmlFor="contato" className="form-label">Contato</label>
                            <input type="text" className="form-control" id="contato" defaultValue={contato} onChange={(e) => setContato(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <InputMask mask="(99)99999-9999" className="form-control" id="telefone" defaultValue={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-5">
                            <label htmlFor="familia" className="form-label">Familia</label>
                            <input type="text" className="form-control" id="familia" defaultValue={familia} onChange={(e) => setFamilia(e.target.value)}/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <label htmlFor="inicio_contrato" className="form-label">Início do contrato</label>
                            <input type="date" className="form-control" id="inicio_contrato" defaultValue={inicioContrato} onChange={(e) => setIncioContrato(e.target.value)} required/>
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <label htmlFor="termino_contrato" className="form-label">Término do contrato</label>
                            <input type="date" className="form-control" id="termino_contrato" defaultValue={fimContrato} onChange={(e) => setFimcontrato(e.target.value)} required/>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <label htmlFor="valor_contrato" className="form-label">Valor do contrato</label>
                            <div className="input-group">
                                <span className="input-group-text">R$</span>
                                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" id="valor_contrato" defaultValue={valorContrato} onChange={(e) => setValorContrato(e.target.value.toString())} required/>
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                            <button type="submit" className="btn btn-primary me-2">Salvar</button>
                            <button type="button" onClick={() => setOpenDialog(true)} className="btn btn-danger me-2"><i className="bi bi-trash"></i></button>
                            <Dialog
                                open={openDialog}
                                onClose={() => setOpenDialog(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Excluir"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Você está prestes a excluir a empresa: {nome}
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={() => setOpenDialog(false)}>Voltar</Button>
                                <Button onClick={excluir} autoFocus>
                                    Confirmar
                                </Button>
                                </DialogActions>
                            </Dialog>
                            <button type="button" onClick={alternar} className="btn btn-outline-secondary" >Fechar</button>
                        </div>
                    </form>
                    {show &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            {message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                        </div>
                    }
                    {showSuccess && 
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <i className="bi bi-check-circle me-1"></i>
                            {message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={alternar}></button>
                        </div>
                    }
                </div>
            </div>
            }
            <div className="card px-2 py-1 px-md-4 py-md-2">
                <div className="card-body">
                    <MUIDataTable
                        title={"Empresas cadastradas"}
                        data={empresas}
                        columns={columns}
                        options={options}
                    />
                </div>

                <div>
                </div>
            </div>
        </Container>
    )
}

export default BuscarEmpresa;