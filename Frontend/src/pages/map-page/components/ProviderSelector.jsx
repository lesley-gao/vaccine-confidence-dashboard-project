// This component is used to select the vaccine type and search for vaccination services.
import { BiSearch } from "react-icons/bi";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/context/AppContextProvider.jsx";
import { useState, useEffect } from 'react';
import { fetchData } from "@/utils/api";

export default function ProviderSelector({ mapSelectedVaccine, onVaccineSelect, onSearch, onPharmacyFilter}) {

    const { vaccineTypes } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [showPharmacyOnly, setShowPharmacyOnly] = useState(false);

    const handlePharmacyToggle = async (checked) => {
        setShowPharmacyOnly(checked);
        if (checked) {
            const data = await fetchData('/healthProvider/filter/type?healthProviderType=Pharmacy%20Service');
            onPharmacyFilter(data);
            console.log("pharmacy data", data);
        } else {
            onPharmacyFilter(null);
        }
    };

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleVaccineChange = (e) => {
        const vaccineId = parseInt(e.target.value);
        if (vaccineId) {
            const selected = vaccineTypes.find(v => v.vaccineId === vaccineId);
            onVaccineSelect(selected);
        } else {
            onVaccineSelect(null);
        }
    };

    useEffect(() => {
        setSearchTerm('');
        onSearch('');
    }, [mapSelectedVaccine]);

    return (
        <div className="space-y-4 w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <select
                    className="w-full sm:flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-1 focus:ring-slate-700"
                    value={mapSelectedVaccine?.vaccineId || ''}
                    onChange={handleVaccineChange}
                >
                    <option value="">Choose vaccine type</option>
                    {vaccineTypes.map((vaccine) => (
                        <option key={vaccine.vaccineId} value={vaccine.vaccineId}>
                            {vaccine.vaccineType}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-2 whitespace-nowrap">
                    <Checkbox id="pharmacy" checked={showPharmacyOnly} onCheckedChange={handlePharmacyToggle}/>
                    <label
                        htmlFor="pharmacy"
                        className="text-sm font-medium text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Show Pharmacy Only
                    </label>
                </div>
            </div>

            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    placeholder="Search by service name, suburb or city"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-slate-700"
                />
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
}
