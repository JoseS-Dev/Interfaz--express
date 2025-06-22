import React from "react";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import { useAuth } from "../context/AuthContext";
const Home = () =>{
    const { isAuthenticated } = useAuth();
    return (
        <div className="bg-primary">
            <Navbar />
            {!isAuthenticated && <LoginModal />}
            <Hero />
            <Services />
            <Gallery />
            <Contact />
            <Footer />
        </div>
    )
}
export default Home;