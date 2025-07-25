import React from "react";
const CardPrevious = ({ colors: {primary_color, secondary_color, ternary_color, cuarternary_color, neutral_color} }) => {

    // Define the colors as variables
    const primaryColor = primary_color || 'DFEEFF'; // Default to orange if not provided
    const secondaryColor = secondary_color || '2563EB'; // Default to white if not provided
    const ternaryColor = ternary_color || 'F97316'; // Default to blue if not provided
    const quaternaryColor = cuarternary_color || 'FFFFFF'; // Default to light blue if not provided
    const neutralColor = neutral_color || '374151'; // Default to dark gray if not provided  


    return (
        <div className="w-full bg-primary py-2" style={{backgroundColor: `#${primaryColor}`}}>
            <div className="text-center rounded-lg h-110 flex flex-col items-center justify-center my-5 bg-quaternary w-17/20 m-auto shadow-lg border-2 border-primary" style={{backgroundColor: `#${quaternaryColor}`, borderColor: `#${primaryColor}`}}>
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <img src='/src/assets/img/img1.avif' alt="Consulta Médica" className="w-full h-full object-cover"/>
                </div>
                <h3 className="text-2xl font-semibold text-secondary mb-2" style={{color: `#${secondaryColor}`}}>Consulta Médica</h3>
                <p className="text-quinary text-xl" style={{color: `#${neutralColor}`}}>Atención médica personalizada con profesionales especializados</p>
            <button className="mt-8 bg-tertiary text-quaternary font-medium py-3 px-6 rounded-md transition-colors cursor-pointer text-xl" style={{backgroundColor: `#${ternaryColor}`, color: `#${quaternaryColor}`}}>Agendar Cita</button>
            </div>
        </div>
    )
}

export default CardPrevious;