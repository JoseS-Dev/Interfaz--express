import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import GalleryVideos from "../components/GalleryVideos";
import Gallery from "../components/Gallery";
import Tangram3d from "../components/loader/tamgram";
import { useAuth } from "../context/AuthContext";
import { useLoader } from "../context/LoaderContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { isHidden } = useLoader();
  const [showTangram, setShowTangram] = useState<boolean>();

  useEffect(() => {
    if (!isHidden) {
      setShowTangram(true);
      const timer = setTimeout(() => {
        setShowTangram(false);
      }, 13000); // 13 segundos

      // Limpia el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [isHidden]);

  return (
    <div>
      {showTangram ? <Tangram3d /> : (
        <>
          <Navbar />
          {!isAuthenticated && <LoginModal />}
          <Hero />
          <Services />
          <Gallery />
          <GalleryVideos />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;