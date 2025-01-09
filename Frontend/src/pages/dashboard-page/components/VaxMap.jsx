// This component is used to display the map of the vaccination centers in New Zealand. 
// Currently, it is embedded from Google Maps.
// In the next iteration, we will use the Google Maps API to display the map.
// The component will be used in the DashboardPage and MapPage.

import React  from 'react';
import ServiceLocations from "@/pages/map-page/components/serviceLocations.jsx"

export default function VaxMap() {

  return (
    <div className="p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] h-full">
      <h1 className="text-xl font-bold font-PoppinsBold mb-3">Where to get vaccinated?</h1>
      <ServiceLocations />
    </div>
  );
}