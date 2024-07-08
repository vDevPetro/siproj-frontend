// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Filter {
    tipo: string;
    valor: string;
    label: string;
}

interface FilterContextType {
    filters: Filter[];
    setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
    addFilter: (filter: Filter) => void;
    removeFilter: (filter: Filter) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [filters, setFilters] = useState<Filter[]>([]);

    const addFilter = (filter: Filter) => {
        setFilters((prevFilters) => [...prevFilters, filter]);
    };

    const removeFilter = (filter: Filter) => {
        setFilters((prevFilters) => prevFilters.filter(f => f.tipo !== filter.tipo || f.valor !== filter.valor));
    };

    return (
        <FilterContext.Provider value={{ filters, setFilters, addFilter, removeFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};
