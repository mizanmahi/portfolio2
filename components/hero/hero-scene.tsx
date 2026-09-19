"use client";

import dynamic from "next/dynamic";

const WireframeAccent = dynamic(
  () =>
    import("@/components/hero/wireframe-accent").then(
      (module) => module.WireframeAccent,
    ),
  {
    loading: () => <div className="hero-scene-fallback" aria-hidden="true" />,
    ssr: false,
  },
);

export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <WireframeAccent />
    </div>
  );
}
