import React from 'react';
import { Link } from 'react-router-dom';
import FormColors from '../FormColors';
import CardPrevious from '../CardColors';

const SectionColors = () => {
    return (
        <main className="w-full h-175 flex flex-col gap-4 lg:flex-row">
            <section className="w-full lg:w-1/4 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 px-3 py-3">
                <article className="flex flex-col items-center text-xl tracking-widese gap-4 py-4">
                    <h3 className="w-full font-bold border-b-2 border-black text-center">Colores plantilla</h3>
                    <FormColors/>
                </article>
            </section>
            <section className="w-full lg:w-3/12 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 flex px-3 py-3">
                <article className="w-full text-xl tracking-widese flex flex-col items-center gap-4 py-4">
                    <h3 className="w-full font-bold border-b-2 border-gray text-center">Vista Previa</h3>
                    <CardPrevious/>
                    <div className="flex justify-center w-full">
                        <Link to={'/'} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                        Ver plantilla principal
                        </Link>
                    </div>
                </article>
            </section>
            <section className="w-full lg:w-1/2 flex flex-col items-center px-3 py-3">
                <article className="border-b-2 w-full border-black flex justify-between items-center text-xl tracking-widese py-2">
                    <h3 className="font-bold">Registro de colores</h3>
                </article>
                <listColors />
            </section>
        </main>
    )
}
export default SectionColors;