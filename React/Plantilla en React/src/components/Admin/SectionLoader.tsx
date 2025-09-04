import React from 'react';
import { useLoader } from '../../context/LoaderContext';

const SectionLoader = () => {
    const { isHidden, showLoader, hideLoader } = useLoader();
    return (
        <>
            <section className="w-full min-h-screen py-10 bg-[#DFEEFF]">
                <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg border-2 border-[#DFEEFF] bg-[#fff]">
                    <h2 className="text-3xl font-bold text-center text-[#2563EB] mb-6">Gestión del Loader</h2>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={showLoader}
                            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                        >
                            Mostrar Loader
                        </button>
                        <button
                            onClick={hideLoader}
                            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                        >
                            Ocultar Loader
                        </button>
                    </div>

                    <p className="text-center mt-4 text-gray-700">
                        Estado actual del Loader:
                        <span
                            className={isHidden ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}
                        >
                            {isHidden ? ' Oculto' : ' Visible'}
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
};

export default SectionLoader;

