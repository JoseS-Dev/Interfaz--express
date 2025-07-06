import React from "react";
import Header from "../components/Admin/Header";
import SectionUsers from "../components/Admin/SectionUsers";

const AdminUsers = () => {
    return (
        <div className="w-full h-screen">
            <Header />
            <SectionUsers/>
        </div>
    )
}
export default AdminUsers;