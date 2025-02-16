/**
 * This component displays a map showing vaccination service locations for a selected vaccine in New Zealand.
 * It uses Google Maps API to render a map with markers representing vaccination locations based on latitude and longitude.
 * The component is displayed on the dashboard page.
 */
import React, { useMemo, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import DataSource from './DataSource';
import { fetchData } from "@/utils/api";

export default function VaxMap({ selectedVaccine }) {

  const [serviceLocations, setServiceLocations] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapOptions = useMemo(() => ({
    center: { lat: -36.8485, lng: 174.7633 },
    zoom: 10,
    disableDefaultUI: false,
    clickableIcons: false,
    zoomControl: false,
    maxZoom: 20,
    minZoom: 3,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  }), []);

  // Fetch service locations for the selected vaccine
  useEffect(() => {
    const fetchLocationsByVaccine = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData(`/health-provider/filter/vac-id?vaccineId=${selectedVaccine.vaccineId}`);
        setServiceLocations(data);
      } catch (err) {
        console.error('Error fetching all locations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationsByVaccine();
  }, [selectedVaccine]);

  if (isloading) return <div className="p-4">Loading...</div>;
  if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="p-4">Loading maps...</div>;

  return (
    <div className="p-4 h-full">
      <div className="flex flex-row gap-2 mb-2">
        <h1 className="text-xl font-bold font-PoppinsBold dark:text-cyan-300">Where to get vaccinated?</h1>
        {serviceLocations && serviceLocations.length > 0 && <DataSource selectedVaccine={selectedVaccine} componentId="vax_map" />}
      </div>

      <div className="h-[420px]">
        <GoogleMap
          options={mapOptions}
          mapContainerStyle={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          {serviceLocations.map(location => {
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
                title={location.hpName}
              />
            );
          })}

        </GoogleMap>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow text-sm dark:text-black">
        Showing {serviceLocations.length} locations
      </div>
    </div>
  );
}