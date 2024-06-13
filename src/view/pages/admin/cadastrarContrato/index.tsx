import styled from "styled-components";
import {Autocomplete} from "@mui/material";
import { useEffect, useState } from "react";
import { listarContratos } from "../../../../controller/Empresas";
import { TextField, FormControl } from "@mui/material";

const Container = styled.main`
    
`;


const CadastrarContrato = () => {
    const [options, setOptions] = useState([{}]);
    const [contratoSap, setContratoSap] = useState('');

    const cadastrar = async() => {

    }

    useEffect(() => {
        const ObterLista = async() => {
            setOptions(await listarContratos());
        }

        ObterLista();
    }, [])

    return (
        <Container id="main" className="main">
            <div className="pagetitle">
                <h1>Cadastrar contrato</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item">Contrato</li>
                        <li className="breadcrumb-item">Cadastrar contrato</li>
                    </ol>
                </nav>
            </div>
            <div className="card px-2 py-1 px-md-4 py-md-2">
                <div className="card-body">
                    <h5 className="card-title">Cadastrar contrato</h5>

                    <form className="row" onSubmit={cadastrar}>
                        <div className="col-12 mt-2">
                            <Autocomplete 
                                disablePortal
                                id="contrato_sap"
                                options={options}
                                sx={{ width: '14rem' }}
                                size="small"
                                renderInput={(params) => <TextField {...params} label="Contrato SAP" variant="standard" />}
                                aria-required
                                inputValue={contratoSap}
                                onInputChange={(event, newInputValue) => setContratoSap(newInputValue)}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            {contratoSap}
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default CadastrarContrato;