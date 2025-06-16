import React from "react";

const CardPrevious = (primaryColor: string, secondaryColor: string, ternaryColor: string, quaternaryColor: string, neutralColor: string) => {
    return (
        <div className="w-full bg-primary py-2" style={{backgroundColor: `#${primaryColor}`}}>
            <div className="text-center rounded-lg h-110 flex flex-col items-center justify-center my-5 bg-quaternary w-17/20 m-auto shadow-lg border-2 border-primary" style={{backgroundColor: `#${quaternaryColor}`, borderColor: `#${primaryColor}`}}>
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <img src="../assets/img/img1.avif" alt="Consulta Médica" className="w-full h-full object-cover"/>
                </div>
                <h3 className="text-2xl font-semibold text-secondary mb-2" style={{color: `#${secondaryColor};`}}>Consulta Médica</h3>
                <p className="text-quinary text-xl" style={{color: `#${neutralColor}`}}>Atención médica personalizada con profesionales especializados</p>
            <button className="mt-8 bg-tertiary text-quaternary font-medium py-3 px-6 rounded-md transition-colors cursor-pointer text-xl" style={{backgroundColor: `#${ternaryColor}`, border: `#${quaternaryColor}`}}>Agendar Cita</button>
            </div>
        </div>
    )
}

export default CardColors;