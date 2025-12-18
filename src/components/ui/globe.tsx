"use client";

import { useEffect, useRef, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import countries from "@/data/globe.json";

// Extend ThreeGlobe for R3F
declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { ref?: React.Ref<ThreeGlobe> };
    }
  }
}

extend({ ThreeGlobe });

// Theme-specific configurations - neutral base with amber accents
const LIGHT_THEME_CONFIG = {
  globeColor: "#f5f5f4",           // stone-100 - clean light base
  emissive: "#e7e5e4",             // stone-200 - subtle
  emissiveIntensity: 0.05,
  polygonColor: "rgba(180, 83, 9, 0.95)", // amber-700 - dark yellow/amber countries
  atmosphereColor: "#f59e0b",       // brand-500 amber glow
  fogColor: 0xfafaf9,              // stone-50
};

const DARK_THEME_CONFIG = {
  globeColor: "#2d2906",           // Dark gold/yellow - visible yellow hue
  emissive: "#4a4209",             // Darker yellow glow
  emissiveIntensity: 0.2,
  polygonColor: "rgba(251, 191, 36, 0.95)", // brand-400 - bright amber countries
  atmosphereColor: "#fbbf24",       // brand-400 amber glow
  fogColor: 0x1a1805,              // dark yellow tint
};

// Shared configuration
const GLOBE_CONFIG = {
  pointSize: 4,
  showAtmosphere: true,
  atmosphereAltitude: 0.15,
  shininess: 0.9,
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

// Sample arc data - global real estate market connections
const sampleArcs = [
  // North America to Europe
  {
    order: 1,
    startLat: 40.7128,
    startLng: -74.006, // New York
    endLat: 51.5074,
    endLng: -0.1278, // London
    arcAlt: 0.3,
    color: "#f59e0b",
  },
  {
    order: 2,
    startLat: 34.0522,
    startLng: -118.2437, // Los Angeles
    endLat: 48.8566,
    endLng: 2.3522, // Paris
    arcAlt: 0.35,
    color: "#fbbf24",
  },
  // Europe to Asia
  {
    order: 3,
    startLat: 51.5074,
    startLng: -0.1278, // London
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo
    arcAlt: 0.4,
    color: "#f59e0b",
  },
  {
    order: 4,
    startLat: 48.8566,
    startLng: 2.3522, // Paris
    endLat: 22.3193,
    endLng: 114.1694, // Hong Kong
    arcAlt: 0.35,
    color: "#fbbf24",
  },
  // Asia to Australia
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198, // Singapore
    endLat: -33.8688,
    endLng: 151.2093, // Sydney
    arcAlt: 0.25,
    color: "#f59e0b",
  },
  // Europe to Middle East
  {
    order: 6,
    startLat: 52.52,
    startLng: 13.405, // Berlin
    endLat: 25.2048,
    endLng: 55.2708, // Dubai
    arcAlt: 0.2,
    color: "#fbbf24",
  },
  // North America to South America
  {
    order: 7,
    startLat: 25.7617,
    startLng: -80.1918, // Miami
    endLat: -23.5505,
    endLng: -46.6333, // São Paulo
    arcAlt: 0.3,
    color: "#f59e0b",
  },
  // Asia connections
  {
    order: 8,
    startLat: 35.6762,
    startLng: 139.6503, // Tokyo
    endLat: 37.5665,
    endLng: 126.978, // Seoul
    arcAlt: 0.15,
    color: "#fbbf24",
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694, // Hong Kong
    endLat: 31.2304,
    endLng: 121.4737, // Shanghai
    arcAlt: 0.15,
    color: "#f59e0b",
  },
  // Middle East to Asia
  {
    order: 10,
    startLat: 25.2048,
    startLng: 55.2708, // Dubai
    endLat: 19.076,
    endLng: 72.8777, // Mumbai
    arcAlt: 0.2,
    color: "#fbbf24",
  },
  // Cross Atlantic
  {
    order: 11,
    startLat: 40.4168,
    startLng: -3.7038, // Madrid
    endLat: -34.6037,
    endLng: -58.3816, // Buenos Aires
    arcAlt: 0.4,
    color: "#f59e0b",
  },
  // Pacific connections
  {
    order: 12,
    startLat: 37.7749,
    startLng: -122.4194, // San Francisco
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo
    arcAlt: 0.45,
    color: "#fbbf24",
  },
];

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 300], fov: 50 }}>
        <ambientLight color={GLOBE_CONFIG.ambientLight} intensity={isDark ? 0.6 : 1.2} />
        <directionalLight
          color={GLOBE_CONFIG.directionalLeftLight}
          position={[-400, 100, 400]}
          intensity={isDark ? 1 : 1.5}
        />
        <directionalLight
          color={GLOBE_CONFIG.directionalTopLight}
          position={[-200, 500, 200]}
          intensity={isDark ? 1 : 1.5}
        />
        <pointLight
          color={GLOBE_CONFIG.pointLight}
          position={[-200, 500, 200]}
          intensity={isDark ? 0.8 : 1.2}
        />
        <GlobeVisualization isDark={isDark} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={GLOBE_CONFIG.autoRotate}
          autoRotateSpeed={GLOBE_CONFIG.autoRotateSpeed}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

interface GlobeVisualizationProps {
  isDark: boolean;
}

function GlobeVisualization({ isDark }: GlobeVisualizationProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const { scene } = useThree();

  // Get theme-specific config
  const themeConfig = isDark ? DARK_THEME_CONFIG : LIGHT_THEME_CONFIG;

  // Create globe instance
  const globeData = useMemo(() => {
    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(GLOBE_CONFIG.showAtmosphere)
      .atmosphereAltitude(GLOBE_CONFIG.atmosphereAltitude);

    return globe;
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    if (!globeData) return;

    // Update atmosphere color
    globeData
      .atmosphereColor(themeConfig.atmosphereColor)
      .hexPolygonColor(() => themeConfig.polygonColor);

    // Set globe material colors
    const globeMaterial = globeData.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new Color(themeConfig.globeColor);
    globeMaterial.emissive = new Color(themeConfig.emissive);
    globeMaterial.emissiveIntensity = themeConfig.emissiveIntensity;
    globeMaterial.shininess = GLOBE_CONFIG.shininess;

    // Add arcs with animation
    globeData
      .arcsData(sampleArcs)
      .arcColor("color")
      .arcAltitude("arcAlt")
      .arcStroke(0.5)
      .arcDashLength(GLOBE_CONFIG.arcLength)
      .arcDashGap(2)
      .arcDashAnimateTime(GLOBE_CONFIG.arcTime);

    // Add rings at arc endpoints
    const ringData = sampleArcs.flatMap((arc) => [
      { lat: arc.startLat, lng: arc.startLng },
      { lat: arc.endLat, lng: arc.endLng },
    ]);

    globeData
      .ringsData(ringData)
      .ringColor(() => isDark ? "#fbbf24" : "#f59e0b") // brand-400 for dark, brand-500 for light
      .ringMaxRadius(GLOBE_CONFIG.maxRings)
      .ringPropagationSpeed(GLOBE_CONFIG.rings)
      .ringRepeatPeriod((GLOBE_CONFIG.arcTime * GLOBE_CONFIG.arcLength) / 2);

    globeRef.current = globeData;
  }, [globeData, isDark, themeConfig]);

  useEffect(() => {
    // Set scene fog for atmosphere effect - theme aware
    scene.fog = new Fog(themeConfig.fogColor, 400, 2000);
  }, [scene, themeConfig.fogColor]);

  return <primitive object={globeData} />;
}

// Import THREE namespace for types
import * as THREE from "three";

export default Globe;
