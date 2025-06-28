import React from "react";
import UsersTable from "./Users/UsersTable";

const SectionUsers = () => {
    return (
        <section
        className="w-full min-h-screen py-10"
        style={{ backgroundColor: `#DFEEFF` }}
        >
        <div
            className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg border-2"
            style={{
            backgroundColor: `#fff`,
            borderColor: `#DFEEFF`,
            }}
        >
            <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: `#2563EB` }}
            >
            Gestión de Usuarios
            </h2>
            <UsersTable />
        </div>
        </section>
    );
};

export default SectionUsers;
