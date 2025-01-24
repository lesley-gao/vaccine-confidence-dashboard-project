import { TbVaccine } from "react-icons/tb";

export default function SingleMedicalCenter({ name, adress, onDetailsClick, isSelected }) {
    return (
        <div 
            className={`flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 ${
                isSelected ? 'bg-blue-50' : 'hover:bg-gray-100 active:bg-gray-200'
            }`}
            onClick={onDetailsClick}
        >
            <div className="flex items-start gap-4 text-sm">
                <TbVaccine 
                    className={`w-6 h-6 mt-1 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} 
                    strokeWidth={1} 
                />
                <div>
                    <h3 className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                        {name}
                    </h3>
                    <p className={`${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                        {adress}
                    </p>
                </div>
            </div>
        </div>
    );
}