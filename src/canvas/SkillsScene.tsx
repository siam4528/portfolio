import { type RefObject, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ACTIVE = new THREE.Color("#3dfc9d");
const IDLE = new THREE.Color("#1f6f7d");
const LABEL_IDLE = "#93aea7";
const LABEL_ACTIVE = "#3dfc9d";

// Rows of 2, 3 and 2, kept mostly facing the camera so spheres never cover each other.
const LAYOUT: [number, number, number][] = [
  [-1.25, 2, 0.3],
  [1.25, 2, -0.3],
  [-2.3, 0, -0.4],
  [0, 0, 0.5],
  [2.3, 0, -0.4],
  [-1.25, -2, -0.3],
  [1.25, -2, 0.3],
];

function useLabelTexture(text: string) {
  const [label, setLabel] = useState<{ texture: THREE.CanvasTexture; aspect: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let texture: THREE.CanvasTexture | undefined;
    const font = '600 44px "JetBrains Mono", Consolas, monospace';
    document.fonts.load(font).finally(() => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      context.font = font;
      canvas.width = Math.ceil(context.measureText(text).width) + 8;
      canvas.height = 64;
      context.font = font;
      context.fillStyle = "#ffffff";
      context.textBaseline = "middle";
      context.fillText(text, 4, 32);
      texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      setLabel({ texture, aspect: canvas.width / canvas.height });
    });
    return () => {
      cancelled = true;
      texture?.dispose();
    };
  }, [text]);

  return label;
}

type NodeProps = {
  name: string;
  position: [number, number, number];
  active: boolean;
  animate: boolean;
  onSelect: () => void;
};

function SkillNode({ name, position, active, animate, onSelect }: NodeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const label = useLabelTexture(name);

  useFrame(() => {
    const blend = animate ? 0.12 : 1;
    mesh.current?.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, active ? 1.25 : 1, blend));
    material.current?.color.lerp(active ? ACTIVE : IDLE, blend);
  });

  return (
    <Float position={position} speed={animate ? 1.4 : 0} floatIntensity={animate ? 0.3 : 0} rotationIntensity={animate ? 0.5 : 0}>
      <mesh ref={mesh} onPointerOver={onSelect}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial ref={material} color={IDLE} flatShading />
      </mesh>
      {label && (
        <sprite position={[0, -0.78, 0]} scale={[0.32 * label.aspect, 0.32, 1]}>
          <spriteMaterial map={label.texture} color={active ? LABEL_ACTIVE : LABEL_IDLE} transparent toneMapped={false} />
        </sprite>
      )}
    </Float>
  );
}

type SkillsSceneProps = {
  names: string[];
  selected: number;
  onSelect: (index: number) => void;
  scroll: RefObject<number>;
};

function Cloud({ names, selected, onSelect, scroll, animate }: SkillsSceneProps & { animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current && animate) group.current.rotation.y = (scroll.current - 0.5) * 0.9;
  });

  return (
    <group ref={group}>
      {names.map((name, i) => (
        <SkillNode
          key={name}
          name={name}
          position={LAYOUT[i % LAYOUT.length]}
          active={i === selected}
          animate={animate}
          onSelect={() => onSelect(i)}
        />
      ))}
    </group>
  );
}

export default function SkillsScene({ reducedMotion, ...props }: SkillsSceneProps & { reducedMotion: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!wrapper.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  const frameloop = reducedMotion ? "demand" : visible ? "always" : "never";

  return (
    <div ref={wrapper} className="relative h-[480px]" aria-hidden="true">
      <Canvas frameloop={frameloop} dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 6]} intensity={2.2} />
        <Cloud {...props} animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}
