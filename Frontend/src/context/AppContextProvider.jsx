/**
 * This context provider manages the global state related to user data and vaccine data.
 * This context is used for storing user authentication information (from localStorage) and vaccine types.
 */
import React, { createContext, useState, useContext } from 'react'
import { useVaccine } from '@/hooks/useVaccine';

export const AppContext = createContext();

// Custom hook to access the AppContext easily
// Throw an error if the hook is used outside of the AppContextProvider
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

export function AppContextProvider({ children }) {

    // Use vaccine-related data and functions from the useVaccine hook
    const { vaccineTypes, isLoading: isLoadingVaccine, error: vaccineError } = useVaccine();

    // Check if user data is stored in localStorage. If not, set user to null
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('userData');

            if (!storedUser) {
                return null;
            }
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse user data from localStorage:', error);
            localStorage.removeItem('userData');
            return null;
        }
    });

    // Update user and storage together
    const updateUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            localStorage.removeItem('userData');
        }
    };

    const context = {
        user,
        setUser: updateUser,
        vaccineTypes,
        isLoading: isLoadingVaccine,
        error: vaccineError,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}