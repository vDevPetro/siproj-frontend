// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getBase } from '../../../controller/Base';
import Base from '../../../model/Base';
import Cartao from '../../components/card';
import { Card, Placeholder } from 'react-bootstrap';
import * as C from './styles';
import { auth } from '../../../controller/ConnectionFactory';
import { useFilters } from '../../../context/HomeFilter';
import { Chip } from '@mui/material';

const Home: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [base, setBase] = useState<Base[]>([]);
    const [originalBase, setOriginalBase] = useState<Base[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { filters, removeFilter } = useFilters();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBase();
                const sortedData = data.sort((a, b) => a.id - b.id);
                setOriginalBase(sortedData);  // Armazene a lista original
                setBase(sortedData);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Um erro inesperado ocorreu.');
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (originalBase && filters.length > 0) {
            let filteredBase = [...originalBase];
            filters.forEach(filter => {
                filteredBase = filteredBase.filter(item => item[filter.tipo as keyof Base] === filter.valor);
            });
            setBase(filteredBase);
        } else {
            setBase(originalBase);  // Se não houver filtros, exiba a lista original
        }
    }, [filters, originalBase]);

    if (loading) {
        return (
            <C.Container className='container-lg pt-5'>
                <div className='col-12 mt-2'>
                    <div className='d-flex flex-wrap justify-content-evenly'>
                        {[...Array(9)].map((_, index) => (
                            <C.CardContainer className='d-flex  row' key={index}>
                                <Card>
                                    <Placeholder as={Card.Header} animation="glow">
                                        <Placeholder xs={1} /> <Placeholder xs={2} />
                                    </Placeholder>
                                    <Card.Body>
                                        <Placeholder as={Card.Title} animation="glow">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={7} /> <Placeholder xs={8} /> <Placeholder xs={3} />
                                        </Placeholder>
                                        <Placeholder as={Card.Footer} animation="glow">
                                            <Placeholder xs={4} /> <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder.Button variant="success" xs={3} />
                                    </Card.Body>
                                </Card>
                            </C.CardContainer>
                        ))}
                    </div>
                </div>
            </C.Container>
        );
    }

    if (!base) {
        return (
            <C.Container className='container-lg pt-5'>
                <div className='col-12 mt-2'>
                    <h2>Erro. Regarregue a página</h2>
                </div>
            </C.Container>
        );
    }

    return (
        <C.Container className='container-lg pt-5'>
            <div className='col-12 mt-2 d-flex flex-column'>
                {filters.length > 0 &&
                    <div className="mb-4 ps-4">
                        <h5>Filtros Ativos:</h5>
                        <div className='d-flex chip-container'>
                            {filters.map((filter, index) => (
                                <Chip key={index} label={`${filter.label}: ${filter.valor}`} variant='outlined' onDelete={() => removeFilter(filter)} />
                            ))}
                        </div>
                    </div>
                }
                <div className='d-flex flex-wrap justify-content-evenly'>
                    
                    {base.map((baseItem) => (
                        <Cartao
                            key={baseItem.id}
                            id={baseItem.id}
                            pep={baseItem.pep || ''}
                            desc={baseItem.desc_projeto}
                            respPetro={baseItem.resp_petro}
                            tipo={baseItem.tipo || ''}
                        />
                    ))}
                </div>
            </div>
        </C.Container>
    );
};

export default Home;
