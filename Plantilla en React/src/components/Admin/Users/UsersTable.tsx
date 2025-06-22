import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { axiosInstance } from '../../../context/axiosInstances';
import UserDetailsModal from './UsersDetails';
console.log("UserDetails:", UserDetailsModal);
const COLORS = {
    primary_color: "DFEEFF",
    secondary_color: "2563EB",
    ternary_color: "F97316",
    cuarternary_color: "FFFFFF",
    neutral_color: "374151",
};


const UsersTable =  () => {
    const columns = [
        {
            name: "ID",
            selector: row => row.id_user,
            sortable: true,
            width: "80px",
        },
        {
            name: "Nombre",
            selector: row => row.name_user,
            sortable: true,
        },
        {
            name: "Apellido",
            selector: row => row.maiden_name_user,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email_user,
            sortable: true,
        },
        {
            name: "Usuario",
            selector: row => row.username,
            sortable: true,
        },
        {
            name: "Rol",
            selector: row => row.role_user,
            sortable: true,
            width: "100px",
            cell: row => (
            <span
                className={`px-2 py-1 rounded text-xs font-semibold`}
                style={{
                backgroundColor: row.role_user === "admin"
                    ? `#${COLORS.secondary_color}20`
                    : `#${COLORS.primary_color}`,
                color: row.role_user === "admin"
                    ? `#${COLORS.secondary_color}`
                    : `#${COLORS.neutral_color}`,
                }}
            >
                {row.role_user}
            </span>
            ),
        },
        {
            name: "Acciones",
            cell: (row) => (
                <div className="flex gap-2">
                <button
                    className="bg-[#F97316] hover:bg-[#ea580c] text-white px-3 py-1 rounded text-xs"
                    style={{ backgroundColor: `#${COLORS.ternary_color}` }}
                    onClick={() => {
                    setSelectedUser(row);
                    setIsModalOpen(true);
                    }}
                >
                    Ver
                </button>
                <button
                    className="bg-[#374151] hover:bg-[#1f2937] text-white px-3 py-1 rounded text-xs"
                    style={{ backgroundColor: `#${COLORS.neutral_color}` }}
                    onClick={() => alert(`Deshabilitar usuario: ${row.username}`)}
                >
                    Deshabilitar
                </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "160px",
        },
    ];

    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/Users");
                setUsers(response.data.users || []);
            } catch (error) {
                console.error("Error al obtener usuarios", error);
            } finally {
                setPending(false);
            }
        };
        
        fetchUsers();
    }, []);

    return (
        <>
            <DataTable
                columns={columns}
                data={users}
                progressPending={pending}
                pagination
                highlightOnHover
                pointerOnHover
                customStyles={{
                headCells: {
                    style: {
                    backgroundColor: `#${COLORS.primary_color}`,
                    color: `#${COLORS.neutral_color}`,
                    fontWeight: 600,
                    fontSize: "1rem",
                    },
                },
                rows: {
                    style: {
                    backgroundColor: `#${COLORS.cuarternary_color}`,
                    color: `#${COLORS.neutral_color}`,
                    },
                    highlightOnHoverStyle: {
                    backgroundColor: `#${COLORS.primary_color}80`,
                    color: `#${COLORS.neutral_color}`,
                    },
                },
                pagination: {
                    style: {
                    backgroundColor: `#${COLORS.cuarternary_color}`,
                    color: `#${COLORS.neutral_color}`,
                    },
                },
                }}
            />
        
            <UserDetailsModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            </>
        );
    };    

export default UsersTable;