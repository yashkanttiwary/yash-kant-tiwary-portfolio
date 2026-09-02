import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Work from "@/components/Work";
import System from "@/components/System";
import Timeline from "@/components/Timeline";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";
import { MotionProvider } from "@/lib/motion-context";

export default function Home() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content">
        <Hero />
        <ProofStrip />
        <Work />
        <System />
        <Timeline />
        <Playground />
        <Contact />
      </main>
    </MotionProvider>
  );
}
