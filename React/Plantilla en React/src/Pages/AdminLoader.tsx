import Header from "../components/Admin/Header";
import SectionLoader from "../components/Admin/SectionLoader";

const AdminLoader = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <SectionLoader />
        </div>
    );
};
export default AdminLoader;
