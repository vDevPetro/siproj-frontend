import MUIDataTable from "mui-datatables";
import styled from "styled-components";
import { Responsive } from "mui-datatables";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import { useState, useEffect, useRef, FormEvent } from "react";
import { getBase } from "../../../controller/Base";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  }
    const layout: Responsive = "simple";
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
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
        rowsPerPageOptions: [5, 10, 25, 50],
        searchOpen: true,
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        onRowClick: (rowData: string[], rowMeta: {dataIndex: number, rowIndex: number}) => {
            CarregarAS(rowData[0])
        },
        responsive: layout,
    }

    const [autorizacoes, setAutorizacoes] = useState([{}]);
    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (hasFetchedData.current) return; 
        hasFetchedData.current = true;
        const CarregarBase = async() => {
            const data = await getBase();
            const sortedData = data.sort((a, b) => a.id - b.id);
            setAutorizacoes(sortedData);
        }

        CarregarBase();

    }, []);

    const CarregarAS = async (id: string) => {
        handleNavigate('/as/'+ id + '/atualizar');
    }    

    return(
        <Container className="container-lg">
            <div className="pagetitle mt-5 pt-1 pt-md-2">
                <h1>Consultar Autorização de Serviço</h1>
            </div>
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
        </Container>
    )
}

export default ConsultarAs;