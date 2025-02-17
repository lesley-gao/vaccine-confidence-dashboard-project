/**
 * This component displays a single medical center.
 * It is used in the MedicalCentersList component.
 */
import { TbVaccine } from "react-icons/tb";

export default function SingleMedicalCenter({ name, address, onDetailsClick, isSelected }) {
    return (
        <div
            className={`flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-900'}`}
            onClick={onDetailsClick}
        >
            <div className="flex items-start gap-4 text-sm">
                <TbVaccine className="w-8 h-8 text-3xl font-bold fill-indigo-400 flex-shrink-0 dark:fill-cyan-300 dark:text-black/70" />
                <div>
                    <h3 className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900 dark:text-white'}`}>
                        {name}
                    </h3>
                    <p className={`${isSelected ? 'text-blue-600' : 'text-gray-500 dark:text-white/60'}`}>
                        {address}
                    </p>
                </div>
            </div>
        </div>
    );
}