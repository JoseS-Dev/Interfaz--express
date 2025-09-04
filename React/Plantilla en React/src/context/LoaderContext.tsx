import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// 1. Clave para el almacenamiento local
const LOCAL_STORAGE_KEY = 'loaderIsHidden';

// 2. Crear el Contexto de React
// Define the context type
interface LoaderContextType {
    isHidden: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

// Provide a default value (functions throw if used outside provider)
const LoaderContext = createContext<LoaderContextType>({
    isHidden: false,
    showLoader: () => { throw new Error('showLoader must be used within LoaderProvider'); },
    hideLoader: () => { throw new Error('hideLoader must be used within LoaderProvider'); }
});

// 3. Crear el Proveedor (Provider) del Contexto
// Este componente envolverá tu aplicación y proveerá el estado del loader
export const LoaderProvider = ({ children }) => {
    // Lee el valor inicial de localStorage o lo establece en `false` (visible por defecto en el primer arranque)
    const getInitialState = () => {
        try {
            const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedValue !== null ? JSON.parse(storedValue) : false; // Cambiado a `false` para mostrarlo al inicio
        } catch (error) {
            console.warn('Error al leer de localStorage:', error);
            return false;
        }
    };

    const [isHidden, setIsHidden] = useState(getInitialState);

    // Efecto para guardar el estado en localStorage cada vez que cambia
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isHidden));
        } catch (error) {
            console.warn('Error al guardar en localStorage:', error);
        }
    }, [isHidden]);

    // Funciones para manipular el estado, equivalentes a las del servicio
    const showLoader = () => setIsHidden(false);
    const hideLoader = () => setIsHidden(true);

    // useMemo para evitar que el objeto de valor se recree en cada render
    const value = useMemo(() => ({
        isHidden,
        showLoader,
        hideLoader
    }), [isHidden]);

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
};

// 4. Hook personalizado para usar fácilmente el contexto en cualquier componente
export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (context === undefined) {
        throw new Error('useLoader debe ser usado dentro de un LoaderProvider');
    }
    return context;
};
