import React from "react";

const Header = () => {
    return (
        <header className="flex items-center w-full h-16 bg-blue-600">
            <article className="flex items-center justify-between w-full px-5 text-lg font-bold tracking-wide text-white">
                <h1>Bienvenido a la parte administrativa</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#eee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-gantt-icon lucide-chart-no-axes-gantt">
                    <path d="M8 6h10" /><path d="M6 12h9" /><path d="M11 18h7" />
                </svg>
            </article>
        </header>
    )
}

export default Header;