import styles from "@/components/ui/ambient-glow.module.css";

export function AuraBackground() {
  return (
    <div aria-hidden="true" className={styles.background}>
      <div className={`${styles.layer} ${styles.layerOne}`} />
      <div className={`${styles.layer} ${styles.layerTwo}`} />
      <div className={`${styles.layer} ${styles.layerThree}`} />
      <div className={`${styles.layer} ${styles.grain}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="aura-grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0.181 0.608 0.061 0 0.075
                      0.181 0.608 0.061 0 0.075
                      0.181 0.608 0.061 0 0.075
                      0     0     0     1 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#aura-grain-filter)" />
        </svg>
      </div>
    </div>
  );
}
