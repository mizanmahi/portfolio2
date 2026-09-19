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

          <div className="hero-stage" aria-label="Terminal boot sequence">
            <div className="hero-stage-bar" aria-hidden="true">
              <span className="hero-stage-dot" />
              <span className="hero-stage-label">profile.sh</span>
              <span className="hero-stage-status">Initializing</span>
            </div>
            <div className="hero-stage-body">
              <span className="hero-stage-prompt">$</span>
              <span> Preparing terminal session</span>
              <span className="hero-stage-caret" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
