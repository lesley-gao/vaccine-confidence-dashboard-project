// This component displays a list of medical centers. It uses the SingleMedicalCenter component to display each center.
import React, { useState, useEffect } from 'react';
import SingleMedicalCenter from './SingleMedicalCenter.jsx';
import { useAppContext } from "@/context/AppContextProvider.jsx";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MedicalCentersList() {
    const { isLoading, filteredLocations, searchedLocations, isSearchActive } = useAppContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [displayedLocations, setDisplayedLocations] = useState([]);
    const ITEMS_PER_PAGE = 10;

    // Determine which locations to display
    const locationsToDisplay = isSearchActive ? searchedLocations : filteredLocations;

    // Count total pages
    const totalPages = Math.ceil(locationsToDisplay.length / ITEMS_PER_PAGE);

    // Update displayed locations when currentPage or locationsToDisplay change
    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setDisplayedLocations(locationsToDisplay.slice(startIndex, endIndex));

        // Reset to first page when locations change
        if (currentPage > 1 && startIndex >= locationsToDisplay.length) {
            setCurrentPage(1);
        }
    }, [currentPage, locationsToDisplay]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return <div className="p-4">Loading centers...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
            {/* List of medical centers */}
            <div className="divide-y divide-gray-100">
                {displayedLocations.map((center) => (
                    <SingleMedicalCenter
                        key={center.hpUuidPk}
                        name={center.hpName}
                        adress={center.hpAddress}
                        onDetailsClick={() => console.log(`Viewing details for ${center.hpName}`)}
                    />
                ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                    <div className="flex items-center">
                        <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">
                                {((currentPage - 1) * ITEMS_PER_PAGE) + 1}
                            </span>
                            {' '}-{' '}
                            <span className="font-medium">
                                {Math.min(currentPage * ITEMS_PER_PAGE, locationsToDisplay.length)}
                            </span>
                            {' '}of{' '}
                            <span className="font-medium">{locationsToDisplay.length}</span>
                            {' '}results
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Previous page button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Page number buttons */}
                        <div className="flex space-x-1">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;

                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                                ) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`px-3 py-1 text-sm rounded-md ${currentPage === pageNumber
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                                // display ellipsis when there are more than 5 pages
                                if (
                                    (pageNumber === currentPage - 3 && pageNumber > 2) ||
                                    (pageNumber === currentPage + 3 && pageNumber < totalPages - 1)
                                ) {
                                    return <span key={pageNumber}>...</span>;
                                }

                                return null;
                            })}
                        </div>

                        {/* Next page button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}