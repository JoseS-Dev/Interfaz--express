import React from 'react';
import { Link } from 'react-router-dom';

const SectionButtons = () => {
    return (
    <main className="flex flex-col lg:flex-row w-full border-2 border-black h-9/10">
        <section className="border-b-2 lg:border-b-0 lg:border-r-2 border-blue-600 w-full lg:w-1/4 flex flex-col items-center justify-center px-5 bg-gray-100 py-8">
            <article className="text-center flex flex-col gap-2 tracking-widese">
                <h1 className="text-2xl font-bold">Panel Administrativo</h1>
                <p className="text-md font-semibold">
                        En esta parte administrativa podrás modificar los colores y la
                        tipografía de la plantilla
                </p>
            </article>
        </section>
        <section className="w-full lg:w-3/4 flex flex-col items-center justify-center bg-white p-8">
            <article id="grilla" className="w-full grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-16">
                <Link to={'/admin/colors'} className="border-2 border-black w-full h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 text-center" id='colors'>
                    Cambiar Colores
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="56"
                        height="56"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="#eee"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-palette-icon lucide-palette"
                    >
                        <path
                            d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
                        />
                        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                    </svg>
                </Link>
                <Link to={'/admin/fonts'} className="border-2 border-black  w-full h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 text-center" id="fonts">
                    Cambiar Tipografía
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="56"
                        height="56"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="#eee"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-file-type-icon lucide-file-type"
                    >
                        <path
                            d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                        />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M9 13v-1h6v1" />
                        <path d="M12 12v6" />
                        <path d="M11 18h2" />
                    </svg>
                </Link>
                <Link to={'/admin/users'} className="border-2 border-black  w-full  h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 text-center" id="users">
                    Usuarios
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="56"
                        height="56"
                        viewBox="0 0 24 24"
                        fill="currentColor"            
                        stroke="#eee"
                        strokeWidth="2"        
                        strokeLinecap="round" 
                        strokeLinejoin="round"  
                        className="lucide lucide-user" 
                    >
                        <circle cx="12" cy="7" r="4"/>
                        <path d="M2 21v-2a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v2"/>
                    </svg>
                </Link>
                <Link to={'/admin/images'} className="border-2 border-black  w-full h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 text-center" id="images">
                    Cambiar Imagenes
                    <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                </Link>
                <Link to={'/admin/videos'} className="border-2 border-black w-full h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 text-center" id="videos">
                    Cambiar Videos
                    <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="currentColor"><path d="m480-420 240-160-240-160v320Zm28 220h224q-7 26-24 42t-44 20L228-85q-33 5-59.5-15.5T138-154L85-591q-4-33 16-59t53-30l46-6v80l-36 5 54 437 290-36Zm-148-80q-33 0-56.5-23.5T280-360v-440q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v440q0 33-23.5 56.5T800-280H360Zm0-80h440v-440H360v440Zm220-220ZM218-164Z"/></svg>
                </Link>
            </article>
        </section>
    </main>
    )
}
export default SectionButtons;