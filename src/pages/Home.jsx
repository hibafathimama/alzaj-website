import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Process from "../components/Process";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Process />
      <Contact />
    </>
  );
}

export default Home;