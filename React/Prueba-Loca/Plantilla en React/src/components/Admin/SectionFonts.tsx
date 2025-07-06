import { Link } from "react-router-dom"
import FormFonts from "../formFonts"
import CardFonts from "../CardFonts"
import ListFonts from "../listFonts"
import { useState } from "react"
const SectionFonts = () => {
    const [refreshListFonts, setRefreshListFonts] = useState(false);
    const [fonts, setFonts] = useState({primaryFont: '', secondaryFont: '', textTitle: '', textSubtitle: '', textParagraph: ''});
    const onRefreshListFonts = () => {
        setRefreshListFonts((value) => !value);
    }
    const onRefreshFontsPreview = (newFonts: {primaryFont: string, secondaryFont: string, textTitle: string, textSubtitle: string, textParagraph: string}) => {
        setFonts(newFonts);
    }
    return (
        <main className="w-full h-9/10 flex flex-col gap-4 lg:flex-row">
            <section className="w-full lg:w-1/3 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 px-3 py-3">
                <article className="flex flex-col items-center text-xl tracking-widese gap-4 py-4">
                    <h3 className="w-full font-bold text-center border-b-2 border-black"> Configuración de Fuentes</h3>
                    <FormFonts onRefreshListFonts={onRefreshListFonts} onRefreshFontsPreview={onRefreshFontsPreview}/>
                </article>
            </section>
            <section className="w-full lg:w-1/3 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 px-3 py-3">
                <article className="text-xl flex flex-col items-center tracking-widese gap-4 py-4 w-full">
                    <h3 className="w-full font-bold text-center border-b-2 border-black">Vista Previa</h3>
                    <CardFonts fonts={fonts}/>
                    <div className="flex justify-center w-full">
                        <Link to='/' className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Ver plantilla principal</Link>
                    </div>
                </article>
            </section>
            <section className="w-full lg:w-1/3 flex flex-col items-center px-3 py-3">
                <article className="border-b-2 w-full border-black flex justify-between items-center text-xl tracking-widese py-2">
                    <h3 className="font-bold">Registro de Fuentes</h3>
                </article>
                <ListFonts refreshListFonts={refreshListFonts}/>
            </section>
        </main>
    )
}

export default SectionFonts