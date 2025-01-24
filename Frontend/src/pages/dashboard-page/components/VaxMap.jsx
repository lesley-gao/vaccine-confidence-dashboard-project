// // This component is used to display the map of the vaccination centers in New Zealand. 
// It is used in the Dashboard page.
import React, { useMemo, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import DataSource from './DataSource';
import { fetchData } from "@/utils/api";

export default function VaxMap() {

  const [serviceLocations, setServiceLocations] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const dataSource = {
    websiteName: "ESR",
    URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
  };

  const fetchAllLocations = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData('/healthProvider/all');
      setServiceLocations(data);
    } catch (err) {
      console.error('Error fetching all locations:', err);
      setServiceLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchAllLocations();
  }, []);

  if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="p-4">Loading maps...</div>;

  return (
    <div className="p-4 h-full">
      <div className="flex flex-row gap-2 mb-2">
        <h1 className="text-xl font-bold font-PoppinsBold ">Where to get vaccinated?</h1>
        <DataSource dataSource={dataSource} />
      </div>

      <div className="h-[380px]">
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
    </div>
  );
}
