import ProviderSelector from "@/pages/map-page/components/ProviderSelector";
import MedicalCentersList from "@/pages/map-page/components/MedicalCentersList";
import ServiceLocations from "./components/ServiceLocations";
import { useAppContext } from "@/context/AppContextProvider.jsx";

export default function MapPage() {
    const { serviceLocations, searchedLocations, isSearchActive, isLoading } = useAppContext();

    const displayLocations = isSearchActive ? searchedLocations : serviceLocations;

    return (
        <div className="p-2 h-full">
            <p className="font-bold text-2xl mb-5">Immunisation Services</p>
            <div className="flex gap-10 ">
                {/* left side */}
                <div className="max-w-3xl bg-white rounded-lg shadow-sm p-8 w-1/2">
                    <ProviderSelector />
                    {!isLoading && (
                        <p className="my-5">
                            We found {displayLocations.length} {displayLocations.length === 1 ? 'result' : 'results'} for you
                        </p>
                    )}
                    <MedicalCentersList />
                </div>

                {/* right side */}
                <div className="w-1/2 p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] h-[1000px]">
                    <ServiceLocations />
                </div>
            </div>
        </div>
    );
}