import { BootSequenceProvider } from "@/components/hero/boot-sequence-provider";
import { TerminalBoot } from "@/components/hero/terminal-boot";
import { HeroActions } from "@/components/hero/hero-actions";
import { ScrollCue } from "@/components/hero/scroll-cue";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { AuraBackground } from "@/components/ui/ambient-glow";

export function Hero() {
  return (
    <>
      <FloatingNav />
      <BootSequenceProvider>
        <main id="top" className="aura-page">
          <section aria-labelledby="hero-title" className="hero-shell aura-bg">
            <AuraBackground />
            <div className="hero-grid">
              <div className="hero-intro">
                <p className="hero-kicker">Developer profile</p>
                <h1 id="hero-title" className="hero-title">
                  Mizanur Rahman
                </h1>
                <p className="hero-summary">
                  Full-Stack Web Developer based in Dhaka, Bangladesh, with 4+ years
                  of experience.
                </p>
                <HeroActions />
              </div>

              <div className="hero-terminal-wrap">
                <TerminalBoot />
              </div>
            </div>
            <ScrollCue />
          </section>
          <div id="projects" className="future-section-anchor" aria-hidden="true" />
        </main>
      </BootSequenceProvider>
    </>
  );
}
