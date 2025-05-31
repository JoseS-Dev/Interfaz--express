
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <div className="bg-primary">
      <Navbar />
      <LoginModal />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
