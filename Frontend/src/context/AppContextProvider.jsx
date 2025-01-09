import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import axios from 'axios'

// Create a context for sharing global data
const AppContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom hook to access the AppContext easily
// Throw an error if the hook is used outside of the AppContextProvider
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

// Create an Axios instance for making HTTP requests
export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
    }
});

export function AppContextProvider({ children }) {
    const [vaccineTypes, setVaccineTypes] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serviceLocations, setServiceLocations] = useState([]); // store all locations
    const [filteredLocations, setFilteredLocations] = useState([]); // store filtered locations
    const [searchedLocations, setSearchedLocations] = useState([]); // store searched locations
    const [isSearchActive, setIsSearchActive] = useState(false); // track search state

    // Function to fetch data from the API
    const fetchData = async (endpoint, options = {}) => {
        try {
            const response = await api.get(endpoint, options);
            if (response.data.code === 0) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Request failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
            throw new Error(errorMessage);
        }
    };

    // function to fetch vaccine types
    const fetchVaccineTypes = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await api.get('/vaccine/all')
            console.log('Fetched vaccine types:', response.data)

            if (response.data.code === 0 && response.data.data) {
                const formattedData = response.data.data.map(vaccine => ({
                    vaccineId: vaccine.vacIdPk || 0,
                    vaccineType: vaccine.vacType || ""
                }));
                setVaccineTypes(formattedData);

                if (formattedData.length > 0) {
                    setSelectedVaccine(formattedData[0]);  // Set the first vaccine type as the default selected value
                }
            } else {
                throw new Error(response.data.message || 'Invalid response format')
            }
        } catch (err) {
            console.error('Error fetching vaccine types:', err)
            setError(err.response?.data?.message || err.message || 'Failed to fetch vaccine types')
            setVaccineTypes([{ vaccineId: 0, vaccineType: "Choose vaccine type..." }])
        } finally {
            setIsLoading(false)
        }
    }

    // TODO: need to add new API at the backend
    // FETCH ALL health providers
    const fetchAllHealthProviders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/healthProvider/all');
            if (response.data.code === 0 && response.data.data) {
                setServiceLocations(response.data.data);
                setFilteredLocations(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching all health providers:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to fetch service locations by vaccine ID
    const fetchServiceLocationsByVaxID = async () => {
        if (!selectedVaccine) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchData(`/healthProvider/all?vaccineId=${selectedVaccine.vaccineId}`);
            setServiceLocations(data);
            setFilteredLocations(data);
            setSearchedLocations(data); // Initialize searched locations
            setIsSearchActive(false); // Reset search state
        } catch (err) {
            console.error('Error fetching service locations:', err);
            setError(err.message);
            setServiceLocations([]);
            setFilteredLocations([]);
            setSearchedLocations([]);
        } finally {
            setIsLoading(false);
        }
    };


    // Function to filter locations by bounds
    const filterLocationsByBounds = useCallback((bounds) => {
        if (!bounds || !serviceLocations.length || isSearchActive) return;

        const filtered = serviceLocations.filter(location => {
            const lat = parseFloat(location.hpLatitude);
            const lng = parseFloat(location.hpLongitude);

            if (isNaN(lat) || isNaN(lng)) return false;

            return lat >= bounds.swLat &&
                lat <= bounds.neLat &&
                lng >= bounds.swLng &&
                lng <= bounds.neLng;
        });

        setFilteredLocations(filtered);
    }, [serviceLocations, isSearchActive]);

    // Handle location search
    const handleLocationSearch = useCallback((searchTerm) => {
        if (!searchTerm.trim()) {
            setIsSearchActive(false);
            setSearchedLocations(serviceLocations);
            return;
        }

        const searchValue = searchTerm.toLowerCase();
        const filtered = serviceLocations.filter(location => {
            const suburb = (location.hpSuburb || '').toLowerCase();
            const city = (location.hpCity || '').toLowerCase();
            const name = (location.hpName || '').toLowerCase();

            return suburb.includes(searchValue) ||
                city.includes(searchValue) ||
                name.includes(searchValue);
        });

        setIsSearchActive(true);
        setSearchedLocations(filtered);
    }, [serviceLocations]);

    // initial fetch vaccine types
    useEffect(() => {
        fetchVaccineTypes();
    }, [])

    // when selectedVaccine changes, fetch service locations
    useEffect(() => {
        if (selectedVaccine) {
            const timer = setTimeout(() => {
                fetchServiceLocationsByVaxID();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [selectedVaccine]);

    const context = {
        API_BASE_URL,
        vaccineTypes,
        selectedVaccine,
        setSelectedVaccine,
        isLoading,
        error,
        fetchData,
        serviceLocations,
        filteredLocations,
        filterLocationsByBounds,
        searchedLocations,
        setSearchedLocations,
        isSearchActive,
        setIsSearchActive,
        handleLocationSearch
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}