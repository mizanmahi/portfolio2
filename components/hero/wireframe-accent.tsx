"use client";

import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { useEffect, useRef, useState } from "react";

function WireframeObject({ accent, motionAllowed }: { accent: string; motionAllowed: boolean }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

  const maxPitch = MathUtils.degToRad(5);
  const maxRoll = MathUtils.degToRad(4);

  useFrame((_, delta) => {
    if (!group.current || !motionAllowed) return;

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      pointer.y * maxPitch,
      4,
      delta,
    );
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.z = MathUtils.damp(
      group.current.rotation.z,
      pointer.x * -maxRoll,
      4,
      delta,
    );
  });

  return (
    <group ref={group} position={[0.9, 0.72, 0]} rotation={[0.1, 0.5, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color={accent} depthWrite={false} opacity={0.06} transparent />
        <Edges color={accent} threshold={15} />
      </mesh>
    </group>
  );
}

export function WireframeAccent() {
  const [accent] = useState(() => {
    const accentToken = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    return `hsl(${accentToken})`;
  });
  const [motionAllowed, setMotionAllowed] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setMotionAllowed(!mediaQuery.matches);

    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  return (
    <Canvas
      camera={{ fov: 42, position: [0, 0, 4] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <WireframeObject accent={accent} motionAllowed={motionAllowed} />
    </Canvas>
  );
}
