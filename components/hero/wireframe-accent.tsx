"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, type Group } from "three";

const networkNodes = [
  [-1.8, 0.72, -0.14],
  [-1.22, 1.34, 0.08],
  [-0.78, 0.4, 0.2],
  [-0.34, 1.08, -0.08],
  [0.1, 0.18, 0.1],
  [0.46, 1.5, -0.16],
  [0.88, 0.76, 0.18],
  [1.42, 1.18, -0.06],
  [1.72, 0.12, 0.12],
  [0.74, -0.42, -0.1],
  [-0.5, -0.7, 0.06],
] as const;

const networkConnections = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [5, 7],
  [6, 8],
  [6, 9],
  [4, 9],
  [4, 10],
] as const;

const maxPitch = MathUtils.degToRad(5);
const maxRoll = MathUtils.degToRad(4);

function NetworkAccent({ color, motionAllowed }: { color: string; motionAllowed: boolean }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

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
    <group ref={group} position={[0, -0.4, 0]} rotation={[0.1, 0.5, 0]} scale={1.5}>
      {networkConnections.map(([start, end]) => (
        <Line
          color={color}
          key={`${start}-${end}`}
          lineWidth={1}
          opacity={0.38}
          points={[networkNodes[start], networkNodes[end]]}
          transparent
        />
      ))}
      {networkNodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={color} opacity={0.8} transparent />
        </mesh>
      ))}
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
      <NetworkAccent color={accent} motionAllowed={motionAllowed} />
    </Canvas>
  );
}
