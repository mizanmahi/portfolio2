import type { ReactNode } from "react";

import styles from "@/components/about/about-section.module.css";

type AboutSectionProps = {
  photo: ReactNode;
};

const stats = [
  { label: "Experience", value: "4+ years" },
  { label: "Mentorship", value: "2,500+ developers" },
  { label: "Location", value: "Dhaka, Bangladesh" },
];

export function AboutSection({ photo }: AboutSectionProps) {
  return (
    <section aria-labelledby="about-title" className={styles.section} id="about">
      <div className={styles.grid}>
        <div className={styles.photoColumn}>{photo}</div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>System profile</p>
          <h2 className={styles.title} id="about-title">About</h2>
          <p className={styles.summary}>
            I&apos;m a <span className={styles.highlight}>Full-Stack</span> developer
            based in Dhaka with <span className={styles.highlight}>4+ years</span> of
            experience building useful web products. As an <span className={styles.highlight}>L2 Developer</span> at <span className={styles.highlight}>Programming Hero</span>,
            I&apos;ve also mentored <span className={styles.highlight}>2,500+ developers</span>
            as they grow into global careers.
          </p>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
