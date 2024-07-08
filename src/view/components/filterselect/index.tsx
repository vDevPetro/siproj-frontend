// src/components/FilterSelect.tsx
import React, { useState } from 'react';
import filterOptions from '../../../data/filter_options.json';
import { useFilters } from '../../../context/HomeFilter';
import { Form, ListGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';

interface FilterOption {
    tipo: string;
    valor: string;
    label: string;
}

const Container = styled.div`
    position: relative;

    .suggestion-list {
        position: absolute;
        margin-top: 2.45rem;
        z-index: 1000;
        width: 90%;
        max-height: 200px;
        overflow-y: auto;
        border-radius: 0.25rem;
        padding-left: 1rem;
    }

`;

const FilterSelect: React.FC = () => {
    const { addFilter } = useFilters();
    const [query, setQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<FilterOption[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            const filtered = filterOptions.filter(option =>
                option.valor.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions([]);
        }
    };

    const handleOptionClick = (option: FilterOption) => {
        setSelectedFilter(option);
        setQuery(option.valor);
        setFilteredOptions([]);
    };

    const handleAddFilter = () => {
        if (selectedFilter) {
            addFilter(selectedFilter);
            setSelectedFilter(null);
            setQuery('');
        }
    };

    return (
        <Container>
            <div className='input-group'>
                <Form.Group controlId="filterAutocomplete">
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar..."
                        className='form-control'
                        id="pesquisar"
                        value={query}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {filteredOptions.length > 0 && (
                    <ListGroup className="suggestion-list">
                        {filteredOptions.map((option, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.valor}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                <Button variant="outline-success" id="btnPesquisar" onClick={handleAddFilter} >
                    <i className="bi bi-search" />
                </Button>
            </div>
        </Container>
    );
};

export default FilterSelect;
