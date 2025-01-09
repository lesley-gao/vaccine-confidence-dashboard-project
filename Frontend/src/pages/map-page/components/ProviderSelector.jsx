// This component is used to select the vaccine type and search for vaccination services.
import { BiSearch } from "react-icons/bi";
import { useAppContext } from "@/context/AppContextProvider.jsx";
import { useState, useEffect } from 'react';

export default function ProviderSelector() {
    const { vaccineTypes, selectedVaccine, setSelectedVaccine, serviceLocations, handleLocationSearch } = useAppContext();

    const [searchTerm, setSearchTerm] = useState('');

    // Handle search input changes
    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleLocationSearch(value);
    };

    // Reset search when vaccine type changes
    useEffect(() => {
        setSearchTerm('');
        handleLocationSearch('');
    }, [selectedVaccine]);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                {/* Vaccine type dropdown list*/}
                <p className=" font-semibold mr-2 w-1/2">Choose vaccine type:</p>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
                    value={selectedVaccine?.vaccineId || ''}
                    onChange={(e) => {
                        const selected = vaccineTypes.find(v => v.vaccineId === parseInt(e.target.value));
                        setSelectedVaccine(selected);
                    }}
                >

                    {/* <option value="" disabled>Choose vaccine type</option> */}
                    {vaccineTypes.map((vaccine) => (
                        <option key={vaccine.vaccineId} value={vaccine.vaccineId}>
                            {vaccine.vaccineType}
                        </option>
                    ))}
                </select>
            </div>

            {/* Location search input */}
            {serviceLocations.length > 0 && (
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchInput}
                        placeholder="Search by service name, suburb or city"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-slate-700"
                    />
                    <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            )}
        </div>
    );
}