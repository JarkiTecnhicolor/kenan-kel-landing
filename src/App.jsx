import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import ScrollProgress from './components/ScrollProgress';
import './styles/global.css';

export default function App() {
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
