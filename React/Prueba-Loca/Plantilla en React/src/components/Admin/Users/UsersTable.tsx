import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { axiosInstance } from '../../../context/axiosInstances';
import UserDetailsModal from './UsersDetails';
import { User } from './user.interface';
import PdfDownloadButton from './PdfDownloadButton';

const COLORS = {
    primary_color: "DFEEFF",
    secondary_color: "2563EB",
    ternary_color: "F97316",
    cuarternary_color: "FFFFFF",
    neutral_color: "374151",
};

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [pending, setPending] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para actualizar el estado activo del usuario
    const toggleUserActive = async (user) => {
        try {
            const url = user.is_active_user
                ? `/Users/deactivate/${user.user_id}`
                : `/Users/activate/${user.user_id}`;

            await axiosInstance.patch(url);

            // Actualizar localmente el estado del usuario sin recargar todo
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.user_id === user.user_id
                        ? { ...u, is_active_user: u.is_active_user === 1 ? 0 : 1 }
                        : u
                )
            );
        } catch (error) {
            console.error("Error al actualizar el estado del usuario", error);
            alert("No se pudo actualizar el estado del usuario.");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/Users");
                console.log("Usuarios obtenidos:", response.data.users);
                setUsers(response.data.users || []);
            } catch (error) {
                console.error("Error al obtener usuarios", error);
            } finally {
                setPending(false);
            }
        };

        fetchUsers();
    }, []);

    const columns = [
        {
            name: "ID",
            selector: row => row.user_id,
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
                        className={`text-white px-3 py-1 rounded text-xs ${
                            row.is_active_user
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                        }`}
                        onClick={() => toggleUserActive(row)}
                    >
                        {row.is_active_user ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "160px",
        },
    ];

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

            <div className="my-4">
                <PdfDownloadButton users={users} />
            </div>

            <UserDetailsModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default UsersTable;
