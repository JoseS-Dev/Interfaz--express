import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { axiosInstance } from "../context/axiosInstances";
import GalleryVideos from "../components/GalleryVideos";


const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Navbar />
      {!isAuthenticated && <LoginModal />}
      <Hero />
      <Services />
      <Gallery />
      <GalleryVideos />
      <Contact />
      <Footer />
    </div>
  );
};
export default Home;
