import { Star } from 'lucide-react';

export default function SingleMedicalCenter({ name, adress, onDetailsClick }) {
    return (
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-start gap-4 text-sm">
                <Star className="w-6 h-6 mt-1 text-gray-400" strokeWidth={1} />
                <div>
                    <h3 className="font-medium text-gray-900">{name}</h3>
                    <p className="text-gray-500">{adress} </p>
                </div>
            </div>
          
            {/* <button
                onClick={onDetailsClick}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors border-2 border-gray-200"
            >
                More details
            </button> */}
        </div>
    )
};


