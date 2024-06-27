import MUIDataTable from "mui-datatables";
import styled from "styled-components";
import { Responsive } from "mui-datatables";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import { useState, useEffect, useRef, FormEvent } from "react";
import { getBase } from "../../../controller/Base";

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

const ConsultarAs = () => {
    const layout: Responsive = "simple";
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: false,
                display: true,
                draggable: false,
            }
        },
        {
            name: "tipo",
            label: "Tipo",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "unidade",
            label: "Unidade",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "resp_petro",
            label: "Resp. Petrobras",
            options: {
                filter: true,
                sort: false,
                display: true
            }
        },
        {
            name: "resp_contr",
            label: "Resp. Rina",
            options: {
                filter: true,
                sort: false,
                display: false,
            }
        },
        {
            name: "contrato_icj",
            label: "Contrato ICJ",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "contrato_sap",
            label: "Contrato SAP",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "pep",
            label: "PEP",
            options: {
                filter: true,
                sort: true,
                display: true
            }
        },
        {
            name: "desc_projeto",
            label: "Descrição",
            options: {
                filter: true,
                sort: true,
                display: true
            }
        },
        {
            name: "porte",
            label: "Porte",
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
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 25],
        searchOpen: true,
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        onRowClick: (rowData: string[], rowMeta: {dataIndex: number, rowIndex: number}) => {
            CarregarAS(rowData[0])
        },
        responsive: layout,
    }

    const [autorizacoes, setAutorizacoes] = useState([{}]);

    useEffect(() => {
        const CarregarBase = async() => {
            const data = await getBase();
            const sortedData = data.sort((a, b) => a.id - b.id);
            setAutorizacoes(sortedData);
        }

        CarregarBase();

    }, []);

    const CarregarAS = async (id: string) => {
        alert('Ainda não implementado. Id clicado: ' + id);
    }    

    return(
        <Container className="main" id="main">
            <div className="pagetitle">
                <h1>Consultar Autorização de Serviço</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Consultar AS</li>
                    </ol>
                </nav>

                <div className="card px-2 py-1 px-md-4 py-md-2">
                    <div className="card-body">
                        <MUIDataTable
                            title={"Autorizações de Serviço"}
                            data={autorizacoes}
                            columns={columns}
                            options={options}
                        />
                    </div>

                    <div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ConsultarAs;