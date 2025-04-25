'use client';

import { useMemo, useState } from 'react';
import {
    filterDoctorsByName,
    filterDoctorsByConsultation,
    sortDoctors,
    filterDoctorsBySpecialty
} from '@/utils/filterUtils';
import AutocompleteSearch from '@/components/AutocompleteSearch';
import FilterPanel from '@/components/FilterPanel';
import DoctorList from '@/components/DoctorList';
import { fetchDoctors } from '@/services/api';
import { useSearchParams } from 'next/navigation';
import { Doctor } from '@/types/doctor';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        searchTerm: searchParams.get('search') || '',
        consultationType: searchParams.get('consultation') || 'all',
        sortBy: searchParams.get('sort') || 'fees',
        specialties: [] as string[], 
    });

    const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
        queryKey: ['doctors'],
        queryFn: fetchDoctors
    });

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleSearchChange = (searchTerm: string) => {
        setFilters(prev => ({ ...prev, searchTerm }));
    };

    const handleSortChange = (sortBy: string) => {
        setFilters(prev => ({ ...prev, sortBy }));
    };

    const filteredDoctors = useMemo(() => {
        let result = [...doctors];

        // Filter by name
        if (filters.searchTerm) {
            result = filterDoctorsByName(result, filters.searchTerm);
        }

        // Filter by consultation type
        if (filters.consultationType && filters.consultationType !== 'all') {
            result = filterDoctorsByConsultation(result, filters.consultationType);
        }

        // Filter by specialty
        if (filters.specialties && filters.specialties.length > 0) {
            result = filterDoctorsBySpecialty(result, filters.specialties);
        }

        // Sort doctors
        if (filters.sortBy) {
            result = sortDoctors(result, filters.sortBy);
        }

        return result;
    }, [doctors, filters]);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-800 py-4">
                <div className="w-full mx-auto px-4">
                    <AutocompleteSearch doctors={doctors} onSearchChange={handleSearchChange} />
                </div>                
            </header>

            <main className="container mx-auto px-4 py-6">
                

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <aside className="md:col-span-1">
                        <FilterPanel
                            doctors={doctors}
                            onFilterChange={handleFilterChange}
                            onSortChange={handleSortChange}
                        />
                    </aside>

                    <section className="md:col-span-2">
                        <DoctorList doctors={filteredDoctors} loading={isLoading} />
                    </section>
                </div>
            </main>
        </div>
    );
}