/**
 * This component is the map page of the application.
 * It provides an interactive map interface for finding immunisation service locations,
 * filtering by vaccine type and pharmacies, and displaying search results dynamically.
 */
import React, { useEffect, useState } from 'react';
import ProviderSelector from "@/pages/map-page/components/ProviderSelector";
import MedicalCentersList from "@/pages/map-page/components/MedicalCentersList";
import ServiceLocationsMap from "./components/ServiceLocationsMap";
import { fetchData } from "@/utils/api";

export default function MapPage() {
    const [serviceLocations, setServiceLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchedLocations, setSearchedLocations] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mapSelectedVaccine, setMapSelectedVaccine] = useState(null);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [showPharmacyOnly, setShowPharmacyOnly] = useState(false);

    // fetch all locations
    const fetchAllLocations = async () => {
        setIsLoading(true);
        try {
            const data = await fetchData('/health-provider/all');
            setServiceLocations(data);
            setFilteredLocations(data);
            setSearchedLocations(data);
            setIsSearchActive(false);
        } catch (err) {
            console.error('Error fetching all locations:', err);
            setServiceLocations([]);
            setFilteredLocations([]);
            setSearchedLocations([]);
        } finally {
            setIsLoading(false);
        }
    };

    // fetch providers by vaccine
    const fetchProvidersByVaccine = async (selectedVaccine) => {
        setMapSelectedVaccine(selectedVaccine);
        setIsLoading(true);

        try {
            let data;
            if (selectedVaccine) {
                data = await fetchData(`/health-provider/filter/vac-id?vaccineId=${selectedVaccine.vaccineId}`);
            } else {
                data = await fetchData('/health-provider/all');
            }

            // if showPharmacyOnly checkbox is ticked, filter the data to show only pharmacies; Otherwise, show all locations
            const filteredData = showPharmacyOnly
                ? data.filter(location => location.hpType === 'Pharmacy Service')
                : data;

            setServiceLocations(filteredData);
            setFilteredLocations(filteredData);
            setSearchedLocations(filteredData);
            setIsSearchActive(false);
        } catch (error) {
            console.error('Error fetching locations:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // handle pharmacy filter
    const handlePharmacyFilter = async (checked) => {
        setShowPharmacyOnly(checked);
        setIsLoading(true);

        try {
            let data;
            if (mapSelectedVaccine) {
                data = await fetchData(`/health-provider/filter/vac-id?vaccineId=${mapSelectedVaccine.vaccineId}`);
            } else {
                data = await fetchData('/health-provider/all');
            }

            const filteredData = checked
                ? data.filter(location => location.hpType === 'Pharmacy Service')
                : data;

            setServiceLocations(filteredData);
            setFilteredLocations(filteredData);
            setSearchedLocations(filteredData);
            setIsSearchActive(false);
        } catch (error) {
            console.error('Error handling pharmacy filter:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // handle location search
    const handleLocationSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setIsSearchActive(false);
            setSearchedLocations(serviceLocations);
            return;
        }

        const searchValue = searchTerm.toLowerCase();
        const filtered = serviceLocations.filter((location) => {
            const suburb = (location.hpSuburb || "").toLowerCase();
            const city = (location.hpCity || "").toLowerCase();
            const name = (location.hpName || "").toLowerCase();

            return suburb.includes(searchValue) ||
                city.includes(searchValue) ||
                name.includes(searchValue);
        });

        setIsSearchActive(true);
        setSearchedLocations(filtered);
    };

    const filterLocationsByBounds = (bounds) => {
        if (!bounds || !serviceLocations.length || isSearchActive) return;

        const filtered = serviceLocations.filter((location) => {
            const lat = parseFloat(location.hpLatitude);
            const lng = parseFloat(location.hpLongitude);

            if (isNaN(lat) || isNaN(lng)) return false;

            return lat >= bounds.swLat &&
                lat <= bounds.neLat &&
                lng >= bounds.swLng &&
                lng <= bounds.neLng;
        });

        setFilteredLocations(filtered);
    };

     // load all locations initially
    useEffect(() => {
        fetchAllLocations();
    }, []);

    return (
        <div className="h-full">
            <div className='relative'>
                <img
                    src="/image/vaccination1.jpg"
                    alt="vaccination"
                    className="w-full mb-4 rounded-xl transition-all duration-300 shadow-md"
                />
                <div className="absolute top-1/2 left-10 -translate-y-1/2 font-bold">
                    <p className="text-2xl text-white uppercase mb-2 max-lg:text-lg">
                        Immunisation Services
                    </p>
                    <p className='text-indigo-900 text-lg max-lg:text-sm max-md:hidden'>
                        Use the map below to find an immunisation site
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 component-card p-4">
                    <ProviderSelector
                        mapSelectedVaccine={mapSelectedVaccine}
                        showPharmacyOnly={showPharmacyOnly}
                        onVaccineSelect={fetchProvidersByVaccine}
                        onSearch={handleLocationSearch}
                        onPharmacyFilter={handlePharmacyFilter}
                    />
                    {!isLoading && (
                        <p className="my-5">
                            We found {(isSearchActive ? searchedLocations : serviceLocations).length}
                            {(isSearchActive ? searchedLocations : serviceLocations).length === 1 ? ' result' : ' results'} for you
                        </p>
                    )}
                    <MedicalCentersList
                        onCenterSelect={setSelectedCenter}
                        locations={isSearchActive ? searchedLocations : serviceLocations}
                        isLoading={isLoading}
                    />
                </div>

                <div className="lg:col-span-7 p-4 component-card h-[1000px]">
                    <ServiceLocationsMap
                        selectedCenter={selectedCenter}
                        onMarkerClick={setSelectedCenter}
                        locations={filteredLocations}
                        searchedLocations={searchedLocations}
                        isSearchActive={isSearchActive}
                        onBoundsChange={filterLocationsByBounds}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}