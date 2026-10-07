"use client";

import { CloudServerIcon, CodeSquareIcon, Database02Icon, ServerStack02Icon, Structure02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "@/components/tech-tools/tech-tools-section.module.css";

const layers = [
  { id: "frontend", icon: CodeSquareIcon, title: "Frontend and languages", label: "Interface", description: "Thoughtful interfaces, built on a typed foundation. From the first interaction to the last detail.", tools: ["JavaScript", "TypeScript", "React", "Next.js"] },
  { id: "backend", icon: ServerStack02Icon, title: "Backend and APIs", label: "Logic", description: "The logic behind the experience. Services and APIs that keep the moving parts working together.", tools: ["Node.js", "Express.js", "Python", "tRPC", "Golang", "Echo", "gRPC"] },
  { id: "data", icon: Database02Icon, title: "Data and persistence", label: "Data", description: "A dependable home for application data. Structured storage, flexible models, and fast access.", tools: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { id: "cloud", icon: CloudServerIcon, title: "Cloud and delivery", label: "Delivery", description: "From local development to production. Repeatable environments and a clear path to shipping.", tools: ["AWS", "Docker", "CI/CD"] },
  { id: "systems", icon: Structure02Icon, title: "Systems and architecture", label: "Foundation", description: "The decisions that hold everything together. Designing for maintainability, security, and performance.", tools: ["System design", "Security", "Performance", "Code review"] },
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
    <svg className={styles.blueprint} viewBox="0 0 640 500" fill="none" role="group" aria-label="Interactive technology stack">
      <path className={styles.guides} d="M64 348 320 220 576 348 320 476Z M320 24V428 M64 348V112 M576 348V112" />
      {[...layers].reverse().map((layer, reverseIndex) => {
        const index = layers.length - 1 - reverseIndex;
        const y = 60 + index * 58;
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
            <path className={styles.callout} d={`M512 ${y + 80}H548`} /><text x="560" y={y + 85} className={styles.planeNumber}>0{index + 1}</text>
          </motion.g>
          {/* Fixed hit areas keep the pointer stable while the visible layer lifts. */}
          <path className={styles.layerHitArea} d={`M128 ${y + 80} 320 ${y - 16} 512 ${y + 80}V${y + 92}L320 ${y + 188} 128 ${y + 92}Z`} />
          <rect className={styles.layerHitArea} x="540" y={y + 56} width="56" height="48" />
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
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % layers.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + layers.length - 1) % layers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = layers.length - 1;
    else return;
    event.preventDefault(); setSelected(next); buttons.current[next]?.focus();
  }
  return (
    <section aria-labelledby="tech-tools-title" className={styles.section} id="tech-tools">
      <div className={styles.content}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>The workbench</p>
          <h2 className={styles.title} id="tech-tools-title">
            <span className={styles.titleLead}>Good software.</span>{" "}
            <span className={styles.titleOffset}>Every layer <span className={styles.titleAccent}>considered.</span></span>
          </h2>
          <p className={styles.description}>The technologies I reach for to turn an idea into a dependable product. Explore the stack, layer by layer.</p>
        </header>
        <motion.div className={styles.workbench} initial={false} whileInView={reducedMotion ? undefined : { opacity: [0.65, 1], y: [20, 0] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65 }}>
          <div className={styles.navigator}>
            <div className={styles.navigatorHeader}><span>Tech and tools</span><span>05 layers</span></div>
            <div role="tablist" aria-label="Technology layers" aria-orientation="vertical" className={styles.tabs}>
              {layers.map((item, index) => (
                <button key={item.id} ref={(element) => { buttons.current[index] = element; }} type="button" role="tab" id={`tech-tab-${item.id}`} aria-selected={selected === index} aria-controls={`tech-panel-${item.id}`} tabIndex={selected === index ? 0 : -1} className={styles.tab} onClick={() => setSelected(index)} onKeyDown={(event) => handleKeyDown(event, index)}>
                  <span className={styles.tabNumber}>0{index + 1}</span><HugeiconsIcon icon={item.icon} size={24} aria-hidden="true" />
                  <span className={styles.tabTitle}>{item.title}<span className={styles.tabMeta}>{item.tools.length} tools & practices</span></span><span className={styles.tabArrow} aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <p className={styles.navigatorFooter}>From the interface to the infrastructure.</p>
          </div>
          <div className={styles.explorer}>
            <div className={styles.diagramHeader}><span className={styles.systemLabel}>stack / {layer.id}</span><span className={styles.diagramCaption}>Architecture view</span></div>
            <div className={styles.diagram}><StackBlueprint selected={selected} reducedMotion={reducedMotion} onSelect={setSelected} /><span className={styles.diagramLabel}>{layer.label}</span></div>
            {layers.map((item, index) => (
              <div key={item.id} role="tabpanel" id={`tech-panel-${item.id}`} aria-labelledby={`tech-tab-${item.id}`} hidden={selected !== index} tabIndex={0} className={styles.panel}>
                {selected === index && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }}>
                  <div className={styles.panelHeading}><h3>{item.title}</h3><span>0{index + 1} / 05</span></div><p className={styles.panelCopy}>{item.description}</p>
                  <ul className={styles.tools}>{item.tools.map((tool, toolIndex) => <motion.li key={tool} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : toolIndex * 0.035 }}><span aria-hidden="true" />{tool}</motion.li>)}</ul>
                </motion.div>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
