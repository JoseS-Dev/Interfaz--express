
const CardFonts = (primaryFont: string, secondaryFont: string, textTitle: string, textSubtitle: string, textParagraph: string) => {
    return (
        <div className="w-full h-full border-2 border-black flex flex-col items-center justify-center p-5 my-2 rounded-lg overflow-auto">
            <div className="text-center">
                <h1 className="text-md md:text-5xl font-bold mb-4" style={{fontFamily: `${secondaryFont}`, fontSize: `${textTitle}px`}}>Tu Bienestar es Nuestra Prioridad</h1>
                <p className="text-sm sm:text-2xl max-w-3xl mx-auto" style={{fontFamily: `${primaryFont}`, fontSize: `${textSubtitle}px`}}>Servicios de salud integral para toda la familia</p>
                <button className="mt-8 bg-[#F97316] text-white font-medium py-3 px-6 rounded-md transition-colors" style={{fontFamily: `${primaryFont}`, fontSize: `${textParagraph}px`}}>Agendar Cita</button>
            </div>
        </div>
    )
}

export default CardFonts;