"use client";

import { AiBrain03Icon, CloudServerIcon, CodeSquareIcon, Database02Icon, ServerStack02Icon, Structure02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import styles from "@/components/tech-tools/tech-tools-section.module.css";

import { useWorkbenchTour } from "./use-workbench-tour";

const layers = [
  {
    id: "frontend", icon: CodeSquareIcon, title: "Frontend engineering", label: "Interfaces and interaction",
    description: "I build responsive web interfaces, connecting reusable components with the data and interactions that make a product useful.",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "TanStack", "Material UI"],
    example: "Led frontend development for SOLRUF’s solar marketplace. Now building learning experiences across Programming Hero, Phitron, and Next Level.",
    role: "lead-react", context: "SOLRUF & Programming Hero",
  },
  {
    id: "backend", icon: ServerStack02Icon, title: "Backend engineering", label: "Services and APIs",
    description: "I build APIs, authentication, and services with clear boundaries, typed communication, and testing that supports confident changes.",
    tools: ["Node.js", "Express.js", "Golang", "Python", "gRPC", "tRPC", "BullMQ", "FFmpeg", "Testing"],
    example: "Built Go and Python services with gRPC and tRPC. Mentora uses SSE for streamed answers and BullMQ workers for video ingestion with FFmpeg.",
    role: "developer", context: "Programming Hero & Mentora",
  },
  {
    id: "systems", icon: Structure02Icon, title: "System design", label: "Architecture and boundaries",
    description: "I turn product requirements into clear service boundaries and data flows, with attention to maintainability, security, and performance.",
    tools: ["System design", "Service architecture", "Background jobs", "Event sourcing", "Turborepo", "OIDC", "Security", "Performance", "Code review"],
    example: "Designed centralized authentication across company products. Mentora separates interactive requests from background jobs and derives skill mastery from an append-only learning event ledger.",
    role: "developer", context: "Programming Hero & Mentora",
  },
  {
    id: "database", icon: Database02Icon, title: "Database", label: "Storage and access",
    description: "I work with relational and document databases, data modeling, caching, and vector search to keep application data organized and accessible.",
    tools: ["PostgreSQL", "pgvector", "MongoDB", "Mongoose", "Prisma", "Drizzle", "GORM", "Redis", "Firebase"],
    example: "Teach database development with PostgreSQL, MongoDB, and Prisma. Mentora combines pgvector similarity with full-text search to retrieve lecture context within a learner’s watch time.",
    role: "senior-mentor", context: "Programming Hero & Mentora",
  },
  {
    id: "ai", icon: AiBrain03Icon, title: "AI and automation", label: "Agents and workflows",
    description: "I build AI agents and useful automation, connecting language models with relevant data through RAG and vector search.",
    tools: ["AI Agent", "RAG", "Vector DB", "OpenRouter", "OpenAI SDK", "Deepgram", "Python", "AI integration", "Agentic development"],
    example: "Contributed to Edulavo’s multi-agent learning roadmaps. Mentora combines Deepgram transcription, OpenAI embeddings, and OpenRouter model routing for cited lecture Q&A and checkpoint quizzes.",
    role: "developer", context: "Edulavo & Mentora",
  },
  {
    id: "cloud", icon: CloudServerIcon, title: "Cloud delivery", label: "Deployment and operations",
    description: "I bring software into production with repeatable deployments, reliable pipelines, and practical cloud infrastructure.",
    tools: ["AWS", "Docker", "Linux", "Nginx", "CI/CD"],
    example: "Own CI/CD pipelines at Programming Hero, building on years of mentoring developers through containerization and deployment on AWS.",
    role: "developer-l2", context: "Programming Hero",
  },
] as const;

function StackBlueprint({ selected, reducedMotion, onSelect }: { selected: number; reducedMotion: boolean; onSelect: (index: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const layerButtons = useRef<(SVGGElement | null)[]>([]);

  function handleLayerKeyDown(event: KeyboardEvent<SVGGElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % layers.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + layers.length - 1) % layers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = layers.length - 1;
    else if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onSelect(next);
    layerButtons.current[next]?.focus();
  }

  return (
    <svg className={styles.blueprint} viewBox="0 0 640 500" fill="none" role="group" aria-label="Interactive engineering capabilities">
      <path className={styles.guides} d="M64 348 320 220 576 348 320 476Z M320 24V428 M64 348V112 M576 348V112" />
      {[...layers].reverse().map((layer, reverseIndex) => {
        const index = layers.length - 1 - reverseIndex;
        // Keep every layer inside the illustration as categories change.
        const y = 60 + index * (228 / (layers.length - 1));
        const highlighted = hovered === index || focused === index;
        return (
          <g
            key={layer.id}
            ref={(element) => { layerButtons.current[index] = element; }}
            className={styles.layerButton}
            role="button"
            aria-label={`Select ${layer.title}`}
            aria-pressed={selected === index}
            aria-controls={`tech-panel-${layer.id}`}
            tabIndex={selected === index ? 0 : -1}
            data-highlighted={highlighted}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => handleLayerKeyDown(event, index)}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(index); }}
            onPointerLeave={() => setHovered(null)}
            onPointerCancel={() => setHovered(null)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
          >
            <motion.g aria-hidden="true" className={`${styles.layerVisual} ${selected === index ? styles.activePlane : styles.plane}`} animate={{ y: (selected === index ? -12 : 0) - (highlighted && !reducedMotion ? 8 : 0) }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <path className={styles.planeEdge} d={`M128 ${y + 80} 320 ${y + 176} 512 ${y + 80}V${y + 92}L320 ${y + 188} 128 ${y + 92}Z`} />
              <path className={styles.planeFace} d={`M128 ${y + 80} 320 ${y - 16} 512 ${y + 80} 320 ${y + 176}Z`} />
              <path className={styles.planeGrid} d={`M192 ${y + 48} 384 ${y + 144} M256 ${y + 16} 448 ${y + 112} M192 ${y + 112} 384 ${y + 16} M256 ${y + 144} 448 ${y + 48}`} />
              <path className={styles.trace} d={`M224 ${y + 80} 288 ${y + 48} 352 ${y + 80} 416 ${y + 48}`} />
              <circle className={styles.node} cx="224" cy={y + 80} r="4" /><circle className={styles.node} cx="416" cy={y + 48} r="4" />
              <path className={styles.callout} d={`M512 ${y + 80}H548`} /><circle cx="560" cy={y + 80} r="4" className={styles.node} />
            </motion.g>
            {/* Fixed hit areas keep the pointer stable while the visible layer lifts. */}
            <path className={styles.layerHitArea} d={`M128 ${y + 80} 320 ${y - 16} 512 ${y + 80}V${y + 92}L320 ${y + 188} 128 ${y + 92}Z`} />
            <rect className={styles.layerHitArea} x="540" y={y + 60} width="56" height="40" />
          </g>
        );
      })}
    </svg>
  );
}

export function TechToolsSection() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion() ?? false;
  const layer = layers[selected];
  const { sectionRef, contentRef, active: tourActive, distance: tourDistance, finish: finishTour } = useWorkbenchTour(layers.length, setSelected);
  function selectManually(index: number) {
    if (tourActive) finishTour();
    setSelected(index);
  }
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % layers.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + layers.length - 1) % layers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = layers.length - 1;
    else return;
    event.preventDefault(); selectManually(next); buttons.current[next]?.focus();
  }
  return (
    <section ref={sectionRef} aria-labelledby="tech-tools-title" className={styles.section} id="tech-tools" data-tour={tourActive || undefined} style={{ "--tour-distance": `${tourDistance}px` } as CSSProperties}>
      <div className={styles.content} ref={contentRef}>
        <header className={styles.intro}>
          <span className={styles.headingMark} aria-hidden="true"><span /><span /><span /></span>
          <h2 className={styles.title} id="tech-tools-title">The workbench</h2>
          <span className={styles.headingRule} aria-hidden="true" />
          {tourActive && <div className={styles.tourControls}><span>Scroll to explore</span><button type="button" onClick={() => finishTour()}>Skip tour <span aria-hidden="true">↗</span></button></div>}
        </header>
        <motion.div className={styles.workbench} initial={false} whileInView={reducedMotion ? undefined : { opacity: [0.65, 1], y: [20, 0] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65 }}>
          <div className={styles.navigator}>
            <div className={styles.navigatorHeader}>Engineering in practice</div>
            <div role="tablist" aria-label="Engineering capabilities" aria-orientation="vertical" className={styles.tabs}>
              {layers.map((item, index) => (
                <button key={item.id} ref={(element) => { buttons.current[index] = element; }} type="button" role="tab" id={`tech-tab-${item.id}`} aria-selected={selected === index} aria-controls={`tech-panel-${item.id}`} tabIndex={selected === index ? 0 : -1} className={styles.tab} onClick={() => selectManually(index)} onKeyDown={(event) => handleKeyDown(event, index)}>
                  <HugeiconsIcon icon={item.icon} size={24} aria-hidden="true" />
                  <span className={styles.tabTitle}>{item.title}</span><span className={styles.tabArrow} aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <p className={styles.navigatorFooter}>Clear architecture.<br />Thoughtful code reviews.<br />Knowledge shared along the way.</p>
          </div>
          <div className={styles.explorer}>
            <div className={styles.diagramHeader}><HugeiconsIcon icon={layer.icon} size={24} aria-hidden="true" /><span>Select a layer to explore</span></div>
            <div className={styles.diagram}><StackBlueprint selected={selected} reducedMotion={reducedMotion} onSelect={selectManually} /><span className={styles.diagramLabel}>{layer.label}</span></div>
            <div className={styles.panels}>
              {layers.map((item, index) => (
                <div key={item.id} role="tabpanel" id={`tech-panel-${item.id}`} aria-labelledby={`tech-tab-${item.id}`} hidden={selected !== index} tabIndex={0} className={styles.panel}>
                  <motion.div key={`${item.id}-${selected === index}`} initial={reducedMotion || selected !== index ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }}>
                    <div className={styles.panelHeading}><h3>{item.title}</h3></div><p className={styles.panelCopy}>{item.description}</p>
                    <ul className={styles.tools}>{item.tools.map((tool, toolIndex) => <motion.li key={tool} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : toolIndex * 0.035 }}>{tool}</motion.li>)}</ul>
                    <div className={styles.example}>
                      <p className={styles.exampleLabel}>In practice <span>{item.context}</span></p>
                      <p className={styles.exampleCopy}>{item.example}</p>
                      <a href={`#experience-${item.role}`} className={styles.exampleLink}>Explore the role <span aria-hidden="true">↗</span></a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      {tourActive && <div className={styles.tourRunway} aria-hidden="true" />}
    </section>
  );
}
