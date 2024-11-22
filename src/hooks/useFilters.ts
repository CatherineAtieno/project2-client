import {useState} from "react";


export default function useFilters() {
    const [filters, setFilters] = useState<FiltersObj>({
        services: new Map(),
        serviceApply: false,
        county: new Map(),
        countyApply: false,
    });

    return {
        filters,
        setFilters,
    }
}

