import Navbar from "../components/NavBar";
import Header from "../components/Header";
import About from "../components/About";
import FeaturedPosts from "../components/FeaturedPosts";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

import { useRef } from "react";

export default function MainPage() {
    const homeRef = useRef<HTMLDivElement>(null);
    const eventsRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
  
    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    return (
        <div className="z-0">
            <Navbar handleScroll={scrollToSection} 
            homeRef={homeRef}
            eventsRef={eventsRef}
            servicesRef={servicesRef}
            aboutRef={aboutRef}
            contactRef={contactRef}
            />
            <div ref={homeRef}></div>
            <Header handleScroll={scrollToSection} servicesRef={servicesRef} contactRef={contactRef}/>
            <div id="about" ref={aboutRef}></div>
            <About/>
            <div id="services" ref={servicesRef}></div>
            <FeaturedPosts />
            <FAQ/>
            <Gallery/>
            <div id="contact" ref={contactRef}></div>
            <Footer/>
        </div>


    )
}
