// This component displays a Google Map with vaccination service locations in New Zealand.
// It allows users to view markers for each location and interact with them via InfoWindows.
import React, { useState, useMemo, useCallback, useRef, useEffect, } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { LuMapPin } from "react-icons/lu";

export default function ServiceLocationsMap({ 
    selectedCenter, 
    onMarkerClick, 
    locations,
    searchedLocations,
    isSearchActive,
    onBoundsChange,
    isLoading  }) {

    const [map, setMap] = useState(null);
    const timeoutRef = useRef(null); 

    // Determine which locations to display
    const locationsToDisplay = (isSearchActive && searchedLocations.length >= 1)
        ? searchedLocations
        : locations;

    // Hook for loading the Google Maps script with the API key from environment variables.
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const mapOptions = useMemo(() => ({
        center: { lat: -36.8485, lng: 174.7633 },
        zoom: 10,
        disableDefaultUI: false,
        clickableIcons: false,
        maxZoom: 20,
        minZoom: 3,
        mapTypeControl: false,
    }), []);

    // Function to handle bounds change events (called whenever the map viewport changes).
    const handleBoundsChanged = useCallback(() => {
        if (!map || isSearchActive) return; // Don't update bounds when search is active or map is not ready.
       
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any existing timeout to prevent duplicate calls.
        }

        // Get the new bounds of the map. If bounds are undefined, exit the function.
        const newBounds = map.getBounds();
        if (!newBounds) return;

        const ne = newBounds.getNorthEast();
        const sw = newBounds.getSouthWest();
 
        const boundsData = {
            neLat: ne.lat(),
            neLng: ne.lng(),
            swLat: sw.lat(),
            swLng: sw.lng()
        };
     
        timeoutRef.current = setTimeout(() => {
           onBoundsChange(boundsData);
        }, 500);
    }, [map, onBoundsChange, isSearchActive]);

    // Clean up the timeout when the component is unmounted.
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);


    const handleMarkerClick = useCallback((location) => {
        onMarkerClick(location);
    }, [onMarkerClick]);


    // Function that runs when the map is loaded.
    const onLoad = useCallback((map) => {
        setMap(map);

        // Only set initial bounds if not in search mode
        if (!isSearchActive) {
            const initialBounds = map.getBounds();
            if (initialBounds) {
                const ne = initialBounds.getNorthEast();
                const sw = initialBounds.getSouthWest();
                onBoundsChange({
                    neLat: ne.lat(),
                    neLng: ne.lng(),
                    swLat: sw.lat(),
                    swLng: sw.lng()
                });
            }
        }
    }, [onBoundsChange, isSearchActive]);

    if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>;
    if (!isLoaded) return <div className="p-4">Loading maps...</div>;

    return (
        <div className="h-full relative">
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMap
                    options={mapOptions}
                    mapContainerStyle={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                    onLoad={onLoad}
                    onBoundsChanged={handleBoundsChanged}
                >

                    {locationsToDisplay.map(location => {
                        const lat = parseFloat(location.hpLatitude);
                        const lng = parseFloat(location.hpLongitude);

                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <MarkerF
                                key={location.hpUuidPk}
                                position={{ lat, lng }}
                                icon={{
                                    url: '/image/injection2.png',
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                                onClick={() => handleMarkerClick(location)}
                                title={location.hpName}
                            />
                        );
                    })}

                    {selectedCenter && (
                        <InfoWindowF
                            position={{ lat: parseFloat(selectedCenter.hpLatitude), lng: parseFloat(selectedCenter.hpLongitude) }}
                            onCloseClick={() => onMarkerClick(null)}
                            options={{
                                pixelOffset: new window.google.maps.Size(0, -15),
                                maxWidth: 320
                            }}>
                            <div className="p-2 min-w-[280px]">
                                <div className="flex items-start gap-3 mb-4">
                                    <img src="/image/logo.png" alt="logo" className="w-8 h-8" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1">
                                            {selectedCenter.hpName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Medical Center
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1">
                                            <LuMapPin className="w-7 h-7 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800  ">
                                                {selectedCenter.hpAddress}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                                    <button
                                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedCenter.hpLatitude},${selectedCenter.hpLongitude}`, '_blank')}
                                        className="flex-1 px-3 py-2 text-sm font-medium text-customTheme-dark border border-indigo-900 hover:bg-indigo-100 rounded-md shadow-sm hover:shadow-md hover:translate-y-[-1px] hover:scale-[1.005] active:translate-y-[1px] active:shadow-inner active:opacity-90 active:scale-100 transition-all duration-200"
                                    > Get Directions </button>

                                    <button
                                        onClick={() => window.open('https://app.bookmyvaccine.health.nz/screening', '_blank')}
                                        className=" submission-btn flex-1 px-3 py-2 text-sm  "
                                    > Book Now </button>
                                </div>
                            </div>
                        </InfoWindowF>
                    )}
                </GoogleMap>
            </div>


            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow text-sm">
                {isLoading ? 'Loading...' : `Showing ${locationsToDisplay.length} locations`}
            </div>
        </div>
    );
}