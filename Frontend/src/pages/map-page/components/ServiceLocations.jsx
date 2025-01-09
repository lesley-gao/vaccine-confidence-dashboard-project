// This component displays a Google Map with vaccination service locations in New Zealand.
// It allows users to view markers for each location and interact with them via InfoWindows.
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useAppContext } from "@/context/AppContextProvider.jsx";

export default function ServiceLocations() {
    const { isLoading, serviceLocations, filteredLocations, searchedLocations, isSearchActive, filterLocationsByBounds } = useAppContext();

    const [map, setMap] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const timeoutRef = useRef(null); // Reference to store timeout ID for debouncing map bounds changes.

    // Determine which locations to display
    const locationsToDisplay = (isSearchActive && searchedLocations.length >= 1)
        ? searchedLocations
        : filteredLocations;

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
    }), []);

    // Function to handle bounds change events (called whenever the map viewport changes).
    const handleBoundsChanged = useCallback(() => {
        if (!map || isSearchActive) return; // Don't update bounds when search is active or map is not ready.
        // Clear any existing timeout to prevent duplicate calls.
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Get the new bounds of the map.If bounds are undefined, exit the function.
        const newBounds = map.getBounds();
        if (!newBounds) return;

        const ne = newBounds.getNorthEast();
        const sw = newBounds.getSouthWest();
        // Data object containing the bounds of the map.  
        const boundsData = {
            neLat: ne.lat(),
            neLng: ne.lng(),
            swLat: sw.lat(),
            swLng: sw.lng()
        };
        // Set a timeout to debounce frequent calls to filterLocationsByBounds.
        timeoutRef.current = setTimeout(() => {
            filterLocationsByBounds(boundsData);
        }, 500);
    }, [map, filterLocationsByBounds, isSearchActive]);

    // Clean up the timeout when the component is unmounted.
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Function to handle marker click events (opens the InfoWindow).
    const handleMarkerClick = useCallback((location) => {
        setSelectedMarker(location);
    }, []);

    // Function that runs when the map is loaded.
    const onLoad = useCallback((map) => {
        setMap(map);

        // Only set initial bounds if not in search mode
        if (!isSearchActive) {
            const initialBounds = map.getBounds();
            if (initialBounds) {
                const ne = initialBounds.getNorthEast();
                const sw = initialBounds.getSouthWest();
                filterLocationsByBounds({
                    neLat: ne.lat(),
                    neLng: ne.lng(),
                    swLat: sw.lat(),
                    swLng: sw.lng()
                });
            }
        }
    }, [filterLocationsByBounds, isSearchActive]);

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
                                    url: '/injection2.png',
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                                onClick={() => handleMarkerClick(location)}
                                title={location.hpName}
                            />
                        );
                    })}

                    {/* InfoWindow displayed when a marker is selected */}
                    {selectedMarker && (
                        <InfoWindowF
                            position={{ lat: parseFloat(selectedMarker.hpLatitude), lng: parseFloat(selectedMarker.hpLongitude) }}
                            onCloseClick={() => setSelectedMarker(null)}>
                            <div className="p-2">
                                <h3 className="font-bold mb-2 text-indigo-700">{selectedMarker.hpName}</h3>
                                <p className="mb-2">{selectedMarker.hpAddress}</p>
                                <p>{selectedMarker.hpSuburb}, {selectedMarker.hpCity}</p>
                            </div>
                        </InfoWindowF>
                    )}

                </GoogleMap>
            </div>

            {/* show the loading state or number of locations*/}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow text-sm">
                {isLoading ? 'Loading...' : `Showing ${locationsToDisplay.length} locations`}
            </div>
        </div>
    );
}
