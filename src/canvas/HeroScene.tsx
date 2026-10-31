import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BOUNDS = new THREE.Vector3(8, 4.5, 3);
const LINK_DISTANCE = 1.9;
const REPEL_RADIUS = 2.4;

type NetworkProps = { count: number; animate: boolean };

function Network({ count, animate }: NetworkProps) {
  const nodes = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.BufferGeometry>(null);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, velocities, linePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2 * BOUNDS.x;
      positions[i + 1] = (Math.random() - 0.5) * 2 * BOUNDS.y;
      positions[i + 2] = (Math.random() - 0.5) * 2 * BOUNDS.z;
      velocities[i] = (Math.random() - 0.5) * 0.25;
      velocities[i + 1] = (Math.random() - 0.5) * 0.25;
      velocities[i + 2] = (Math.random() - 0.5) * 0.1;
    }
    return { positions, velocities, linePositions: new Float32Array(count * 12 * 3) };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const maxSegments = linePositions.length / 6;

  // The text sits above the canvas, so the pointer is read from the window.
  useEffect(() => {
    if (!animate) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((_, delta) => {
    const dt = animate ? Math.min(delta, 0.05) : 0;
    const mouseX = pointer.current.x * BOUNDS.x;
    const mouseY = pointer.current.y * BOUNDS.y;

    for (let i = 0; i < count; i++) {
      const p = i * 3;
      for (let axis = 0; axis < 3; axis++) {
        positions[p + axis] += velocities[p + axis] * dt;
        const limit = BOUNDS.getComponent(axis);
        if (Math.abs(positions[p + axis]) > limit) {
          velocities[p + axis] *= -1;
          positions[p + axis] = Math.sign(positions[p + axis]) * limit;
        }
      }

      let x = positions[p];
      let y = positions[p + 1];
      if (animate) {
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < REPEL_RADIUS) {
          const push = (1 - distance / REPEL_RADIUS) * 0.9;
          x += (dx / distance) * push;
          y += (dy / distance) * push;
        }
      }

      dummy.position.set(x, y, positions[p + 2]);
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(i, dummy.matrix);
    }
    if (nodes.current) nodes.current.instanceMatrix.needsUpdate = true;

    let segment = 0;
    for (let a = 0; a < count && segment < maxSegments; a++) {
      const ax = positions[a * 3];
      const ay = positions[a * 3 + 1];
      const az = positions[a * 3 + 2];
      for (let b = a + 1; b < count && segment < maxSegments; b++) {
        const bx = positions[b * 3];
        const by = positions[b * 3 + 1];
        const bz = positions[b * 3 + 2];
        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE * LINK_DISTANCE) {
          linePositions.set([ax, ay, az, bx, by, bz], segment * 6);
          segment++;
        }
      }
    }
    if (lines.current) {
      lines.current.setDrawRange(0, segment * 2);
      lines.current.attributes.position.needsUpdate = true;
    }

    if (group.current && animate) {
      group.current.rotation.y += (pointer.current.x * 0.18 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-pointer.current.y * 0.1 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={nodes} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[0.045, 0]} />
        <meshBasicMaterial color="#38d9f5" />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry ref={lines}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3dfc9d" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

type HeroSceneProps = { isMobile: boolean; reducedMotion: boolean };

export default function HeroScene({ isMobile, reducedMotion }: HeroSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering once the hero has scrolled out of view.
  useEffect(() => {
    if (!wrapper.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  const frameloop = reducedMotion ? "demand" : visible ? "always" : "never";

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        <Network count={isMobile ? 60 : 180} animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}
