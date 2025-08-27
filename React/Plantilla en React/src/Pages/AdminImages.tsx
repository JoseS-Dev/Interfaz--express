import Header from "../components/Admin/Header";
import { SectionImages } from "../components/Admin/SectionImages";

const AdminImages = () => {
  return (
    <div className="w-full h-screen flex flex-col border-r-2 border-gray-300">
      <Header />
      <SectionImages />
    </div>
  );
};
export default AdminImages;
