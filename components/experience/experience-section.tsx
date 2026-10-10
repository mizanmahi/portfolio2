"use client";

import { ArrowDown01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef, type PointerEvent } from "react";

import { employers, type Employer, type ExperienceRole } from "./experience-data";
import styles from "./experience-section.module.css";

function RoleCard({ role, reduced }: { role: ExperienceRole; reduced: boolean }) {
  function moveLight(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <li className={styles.roleEntry}>
      <span className={styles.connection} aria-hidden="true" />
      <span className={styles.node} data-current={role.current || undefined} aria-hidden="true"><HugeiconsIcon icon={role.icon} size={24} /></span>
      <motion.article
        className={styles.card}
        data-current={role.current || undefined}
        aria-labelledby={`experience-${role.id}`}
        onPointerMove={moveLight}
        initial={false}
        whileInView={reduced ? undefined : { opacity: [0.5, 1], y: [24, 0] }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.spotlight} aria-hidden="true" />
        <div className={styles.cardContent}>
          <div className={styles.cardMeta}><span>{role.dates}</span>{role.current && <span className={styles.current}>Current role</span>}</div>
          <div className={styles.roleHeading}><HugeiconsIcon className={styles.mobileRoleIcon} icon={role.icon} size={24} aria-hidden="true" /><h4 id={`experience-${role.id}`} className={styles.roleTitle}>{role.title}</h4></div>
          {role.location && <p className={styles.roleLocation}><HugeiconsIcon icon={Location01Icon} size={16} aria-hidden="true" />{role.location}</p>}
          {role.summary && <p className={styles.summary}>{role.summary}</p>}
          {role.details.length > 0 && (
            <details className={styles.details} open={role.current || undefined}>
              <summary><span>Responsibilities</span><HugeiconsIcon icon={ArrowDown01Icon} size={20} aria-hidden="true" /></summary>
              <ul>{role.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </details>
          )}
          <ul className={styles.technologies} aria-label={`Technologies used as ${role.title}`}>
            {role.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
      </motion.article>
    </li>
  );
}

function EmployerTimeline({ employer, reduced }: { employer: Employer; reduced: boolean }) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 65%", "end 65%"] });

  return (
    <div className={styles.employerGroup}>
      <header className={styles.employer}>
        <div className={styles.employerHeading}>
          <h3 className={styles.employerName}>{employer.name}</h3>
          <span className={styles.roleCount}>{employer.roles.length} {employer.roles.length === 1 ? "role" : "roles"}</span>
        </div>
        <p className={styles.employerDates}>{employer.dates}</p>
        <p className={styles.employerLocation}><HugeiconsIcon icon={Location01Icon} size={18} aria-hidden="true" />{employer.location}</p>
        <p className={styles.employerDescription}>{employer.description}</p>
      </header>
      <ol className={styles.timeline} ref={timelineRef} aria-label={`Roles at ${employer.name}`}>
        <li className={styles.rail} aria-hidden="true"><motion.span style={{ scaleY: reduced ? 1 : scrollYProgress }} /></li>
        {employer.roles.map((role) => <RoleCard key={role.id} role={role} reduced={reduced} />)}
      </ol>
    </div>
  );
}

export function ExperienceSection() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-title">
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.ambient} />
        <svg className={styles.circuit} viewBox="0 0 600 1200" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M40 0v160c0 70 100 70 100 140v230c0 80-100 80-100 160v510M200 0v320c0 60 120 60 120 120v280c0 60-120 60-120 120v360M440 0v180c0 80-80 80-80 160v280c0 80 140 80 140 160v420" />
          <circle cx="140" cy="380" r="8" /><circle cx="320" cy="620" r="8" /><circle cx="200" cy="1000" r="8" />
        </svg>
      </div>
      <div className={styles.content}>
        <header className={styles.intro}>
          <div><p className={styles.eyebrow}>Work experience</p><h2 className={styles.title} id="experience-title">Every role,<br /><span>a new perspective.</span></h2></div>
          <div className={styles.introAside}><p>From teaching the fundamentals to building the products. The work that shaped how I engineer.</p><span>3 teams <span aria-hidden="true">/</span> 8 roles <span aria-hidden="true">/</span> 2019 - now</span></div>
        </header>
        <div className={styles.employers}>{employers.map((employer) => <EmployerTimeline key={employer.id} employer={employer} reduced={reduced} />)}</div>
        <p className={styles.timelineNote}>Some roles overlap. Dates reflect each position independently.</p>
      </div>
    </section>
  );
}
