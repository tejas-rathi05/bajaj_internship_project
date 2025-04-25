// AutocompleteSearch.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react'; // Import ChevronRight
import { Doctor } from '../types/doctor';
import { Input } from './ui/input';
import { getDoctorSuggestions } from '../utils/filterUtils';

interface AutocompleteSearchProps {
    doctors: Doctor[];
    onSearchChange: (searchTerm: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ doctors, onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Doctor[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            setSearchTerm(searchParam);
            onSearchChange(searchParam);
        }
    }, [onSearchChange]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            return;
        }

        const newSuggestions = getDoctorSuggestions(doctors, searchTerm);
        setSuggestions(newSuggestions);
    }, [searchTerm, doctors]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowSuggestions(value.trim() !== '');
    };

    const handleSuggestionClick = (doctor: Doctor) => {
        setSearchTerm(doctor.name);
        onSearchChange(doctor.name);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearchChange(searchTerm);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto" ref={suggestionRef}>
            <div className="relative">
                <Input
                    type="text"
                    data-testid="autocomplete-input"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm bg-white"
                    placeholder="Search for doctors by name..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(searchTerm.trim() !== '')}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((doctor) => (
                        <div
                            key={doctor.id}
                            data-testid="suggestion-item"
                            className="p-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer transition-colors" // Added justify-between
                            onClick={() => handleSuggestionClick(doctor)}
                        >
                            <div className="flex items-center">
                                {doctor.photo && (
                                    <div className="mr-2 rounded-full overflow-hidden w-8 h-8">
                                        <img src={doctor.photo} alt={doctor.name} className="object-cover w-full h-full" />
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold">{doctor.name}</div>
                                    {doctor.specialities && doctor.specialities.length > 0 && (
                                        <div className="text-sm text-gray-500">{doctor.specialities.map(spec => spec.name).join(', ')}</div>
                                    )}
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" /> {/* Added ChevronRight */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AutocompleteSearch;