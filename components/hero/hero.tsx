import { TerminalBoot } from "@/components/hero/terminal-boot";
import { HeroScene } from "@/components/hero/hero-scene";
import { FloatingNav } from "@/components/navigation/floating-nav";

export function Hero() {
  return (
    <>
      <FloatingNav />
      <main id="top">
      <section aria-labelledby="hero-title" className="hero-shell">
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
          </div>

          <div className="hero-terminal-wrap">
            <HeroScene />
            <TerminalBoot />
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
