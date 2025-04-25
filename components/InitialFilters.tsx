'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface InitialFiltersProps {
    onInitializeFilters: (initialFilters: any) => void;
}

const InitialFilters: React.FC<InitialFiltersProps> = ({ onInitializeFilters }) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const initialFilters = {
            searchTerm: searchParams.get('search') || '',
            consultationType: searchParams.get('consultation') || 'all',
            sortBy: searchParams.get('sort') || 'fees',
            specialties: [],
        };
        onInitializeFilters(initialFilters);
    }, [searchParams, onInitializeFilters]); // Dependencies are important here

    return null; // This component doesn't render anything
};

export default InitialFilters;