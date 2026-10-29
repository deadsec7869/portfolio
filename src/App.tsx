import { useLenis } from './hooks/useLenis';
import { useActiveSection } from './hooks/useActiveSection';
import { Navbar } from './components/Navigation/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { ExperimentsSection } from './components/Experiments/ExperimentsSection';
import { TechStackSection } from './components/TechStack/TechStackSection';
import { OpenSourceSection } from './components/OpenSource/OpenSourceSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { GlobeCursor } from './components/Cursor/GlobeCursor';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { SpatialHud } from './components/UI/SpatialHud';

export function App() {
  // Initialize Lenis smooth inertial scrollytelling
  useLenis();

  const activeSection = useActiveSection([
    'hero',
    'about',
    'work',
    'lab',
    'stack',
    'opensource',
    'contact',
  ]);

  return (
    <div className="relative min-h-screen bg-[#171721] text-[#ededf3] selection:bg-[#5266eb]/30 selection:text-white">
      {/* Screen Loader Transition */}
      <LoadingScreen onComplete={() => {}} />

      {/* Analog Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Interactive 3D Globe Cursor */}
      <GlobeCursor />

      {/* Minimal Studio Navbar */}
      <Navbar />

      {/* Spatial HUD (Altitude Telemetry & Scrollytelling Progress) */}
      <SpatialHud activeSection={activeSection} />

      {/* Main Continuous Narrative Chapters (01 to 07) */}
      <main className="relative z-10 flex flex-col w-full pb-16">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperimentsSection />
        <TechStackSection />
        <OpenSourceSection />
        <ContactSection />
      </main>

      {/* Minimal Studio Footer */}
      <Footer />
    </div>
  );
}

export default App;
