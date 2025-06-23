
const CardFonts = ({ primaryFont, secondaryFont, textTitle, textSubtitle, textParagraph }) => {
    // Define the fonts as variables
    primaryFont = primaryFont || 'RobotoSans'; // Default to Arial if not provided
    secondaryFont = secondaryFont || 'RobotoSerif'; // Default to Georgia if not provided
    textTitle = textTitle || '36'; // Default to 24px if not provided
    textSubtitle = textSubtitle || '24'; // Default to 18px if not provided
    textParagraph = textParagraph || '16'; // Default to 16px if not provided
    console.log(secondaryFont);
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