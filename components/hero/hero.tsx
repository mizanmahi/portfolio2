import { TerminalBoot } from "@/components/hero/terminal-boot";

export function Hero() {
  return (
    <main>
      <section aria-labelledby="hero-title" className="hero-shell">
        <div className="hero-grid">
          <div className="hero-intro">
            <p className="hero-kicker">Portfolio / booting profile</p>
            <h1 id="hero-title" className="hero-title">
              Mizanur Rahman
            </h1>
            <p className="hero-summary">
              Full-Stack Web Developer based in Dhaka, Bangladesh, with 4+ years
              of experience.
            </p>
          </div>

          <TerminalBoot />
        </div>
      </section>
    </main>
  );
}
