"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

interface Velocity {
  x: number;
  y: number;
  z: number;
}

const LOGO_MARK_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <path d="M60 10C85 8 108 25 112 52C116 79 100 105 72 112C44 119 18 102 12 75C6 48 25 14 60 10Z" />
  </svg>
`;

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function smoothstep01(value: number) {
  const t = Math.min(Math.max(value, 0), 1);
  return t * t * (3 - 2 * t);
}

export default function ThreeNetwork({
  paused = false,
  showHomepageAccent = false,
}: {
  paused?: boolean;
  showHomepageAccent?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }; // 마우스 실제 좌표와 부드럽게 따라가는 보간 좌표.
    const scrollState = { current: window.scrollY, target: window.scrollY }; // 현재 보간 중인 스크롤 값과 최신 스크롤 목표값.
    const heroTransition = { distance: Math.max(window.innerHeight * 0.95, 1) }; // 첫 섹션에서 코너 위치로 이동할 때 사용할 스크롤 거리.
    const isMobile = window.innerWidth < 768; // 모바일 여부에 따라 씬 밀도와 위치값을 조정.
    const particleCount = isMobile ? 120 : 180; // 배경 네트워크에 표시할 점 개수.
    const spread = isMobile ? 68 : 86; // 점들이 떠다니는 3D 공간 범위.
    const maxDist = isMobile ? 10.5 : 13.5; // 선으로 연결할 최대 점 간 거리.
    const logoBaseX = isMobile ? -12 : -18; // 첫 섹션에 있을 때 로고의 기본 X 위치.
    const logoBaseY = -3.5; // 첫 섹션에 있을 때 로고의 기본 Y 위치.
    const logoCornerX = isMobile ? -29 : -52; // 모바일 -29, 데스크톱 -42: 값이 작을수록 더 왼쪽
    const logoCornerY = isMobile ? 10.5 : 20.5; // 모바일 10.5, 데스크톱 12.5: 값이 클수록 더 위쪽


    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: Velocity[] = [];

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;
      velocities.push({
        x: (Math.random() - 0.5) * 0.024,
        y: (Math.random() - 0.5) * 0.024,
        z: (Math.random() - 0.5) * 0.012,
      });
      sizes[i] = Math.random() * 2.2 + 0.8;
    }

    const particlePositionAttr = new BufferAttribute(positions, 3);
    const particleSizeAttr = new BufferAttribute(sizes, 1);
    const particleGeo = new BufferGeometry();
    particleGeo.setAttribute("position", particlePositionAttr);
    particleGeo.setAttribute("size", particleSizeAttr);

    const particleUniforms = {
      uTime: { value: 0 },
      uColor1: { value: new Color(0x00d7ff) },
      uColor2: { value: new Color(0x6b73ff) },
    };

    const particleMat = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: particleUniforms,
      vertexShader: `
        attribute float size;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          vAlpha = smoothstep(60.0, 10.0, -mv.z) * 0.7;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float glow = exp(-d * 6.0);
          vec3 col = mix(uColor1, uColor2, sin(uTime * 0.3 + gl_PointCoord.x * 3.14) * 0.5 + 0.5);
          gl_FragColor = vec4(col, glow * vAlpha);
        }
      `,
    });

    const particles = new Points(particleGeo, particleMat);
    scene.add(particles);

    const linePositions = new Float32Array(particleCount * particleCount * 6);
    const linePositionAttr = new BufferAttribute(linePositions, 3);
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute("position", linePositionAttr);

    const lineMat = new LineBasicMaterial({
      color: 0x00c8f6,
      transparent: true,
      opacity: isMobile ? 0.06 : 0.085,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const lines = new LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const gridUniforms = { uTime: { value: 0 } };
    const gridGeo = new PlaneGeometry(200, 200, 40, 40);
    const gridMat = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
      uniforms: gridUniforms,
      vertexShader: `
        varying vec2 vUv;
        varying float vFade;
        uniform float uTime;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin(p.x * 0.05 + uTime * 0.4) * 2.0 + cos(p.y * 0.05 + uTime * 0.3) * 2.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vFade = smoothstep(-120.0, -20.0, mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vFade;
        void main() {
          vec2 grid = abs(fract(vUv * 40.0) - 0.5);
          float line = min(grid.x, grid.y);
          float edge = smoothstep(0.0, 0.03, line);
          float alpha = (1.0 - edge) * 0.14 * vFade;
          gl_FragColor = vec4(0.0, 0.82, 1.0, alpha);
        }
      `,
    });

    const gridMesh = new Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI * 0.42;
    gridMesh.position.y = -22;
    gridMesh.position.z = -20;
    scene.add(gridMesh);

    const accentLight = showHomepageAccent ? new AmbientLight(0xffffff, 0.45) : null;
    const accentKeyLight = showHomepageAccent ? new DirectionalLight(0xa8cbff, 1.2) : null;
    const accentRimLight = showHomepageAccent ? new DirectionalLight(0x5d84d6, 0.55) : null;

    if (accentLight) scene.add(accentLight);
    if (accentKeyLight) {
      accentKeyLight.position.set(-12, 18, 24);
      scene.add(accentKeyLight);
    }
    if (accentRimLight) {
      accentRimLight.position.set(20, -4, 10);
      scene.add(accentRimLight);
    }

    let logoGeo: ExtrudeGeometry | null = null;
    let logoMat: MeshPhysicalMaterial | null = null;
    let logoEdgesGeo: EdgesGeometry | null = null;
    let logoEdgesMat: LineBasicMaterial | null = null;
    let textGeo: PlaneGeometry | null = null;
    let textMat: MeshBasicMaterial | null = null;
    let textTexture: CanvasTexture | null = null;
    let logoAccent: Group | null = null;

    if (showHomepageAccent) {
      const loader = new SVGLoader();
      const { paths } = loader.parse(LOGO_MARK_SVG);
      const shapes = paths.flatMap((path) => SVGLoader.createShapes(path));

      logoGeo = new ExtrudeGeometry(shapes, {
        depth: 18,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 3,
        bevelThickness: 2.5,
        curveSegments: 32,
      });
      logoGeo.center();
      logoGeo.scale(0.085, 0.085, 0.085);

      logoMat = new MeshPhysicalMaterial({
        color: 0x8ebdff,
        emissive: 0x4167a9,
        emissiveIntensity: 0.2,
        roughness: 0.22,
        metalness: 0.14,
        transparent: true,
        opacity: 0.34,
        transmission: 0.18,
        thickness: 1.1,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      });

      const logoMesh = new Mesh(logoGeo, logoMat);

      logoEdgesGeo = new EdgesGeometry(logoGeo, 25);
      logoEdgesMat = new LineBasicMaterial({
        color: 0xc7dcff,
        transparent: true,
        opacity: 0.24,
      });
      const logoEdges = new LineSegments(logoEdgesGeo, logoEdgesMat);
      logoEdges.position.z = 0.04;

      const textCanvas = document.createElement("canvas");
      textCanvas.width = 1536;
      textCanvas.height = 512;
      const ctx = textCanvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 16;
        ctx.shadowColor = "rgba(155, 197, 255, 0.18)";
        ctx.fillStyle = "rgba(236, 244, 255, 0.68)";
        ctx.font = '600 170px "Outfit", "Pretendard Variable", sans-serif';
        ctx.fillText("nanuri IT", textCanvas.width / 2, textCanvas.height / 2 + 6);
      }

      textTexture = new CanvasTexture(textCanvas);
      textGeo = new PlaneGeometry(8.4, 2.8);
      textMat = new MeshBasicMaterial({
        map: textTexture,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      });
      const textMesh = new Mesh(textGeo, textMat);
      textMesh.position.set(0.08, 0.08, 1.7);

      logoAccent = new Group();
      logoAccent.add(logoMesh);
      logoAccent.add(logoEdges);
      logoAccent.add(textMesh);
      logoAccent.position.set(logoBaseX, logoBaseY, -15);
      scene.add(logoAccent);
    }

    const updateHeroTransition = () => {
      const heroSection = document.querySelector<HTMLElement>("[data-scene-anchor='hero']");
      if (!heroSection) {
        heroTransition.distance = Math.max(window.innerHeight * 0.95, 1);
        return;
      }

      heroTransition.distance = Math.max(
        heroSection.offsetHeight * 0.68,
        window.innerHeight * 0.95
      );
    };

    const resize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      updateHeroTransition();
    };

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -((event.clientY / window.innerHeight - 0.5) * 2);
    };

    const onScroll = () => {
      scrollState.target = window.scrollY;
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId = 0;
    let renderedPausedFrame = false;

    const renderFrame = (time: number) => {
      rafId = window.requestAnimationFrame(renderFrame);

      if (pausedRef.current) {
        if (!renderedPausedFrame) {
          renderer.render(scene, camera);
          renderedPausedFrame = true;
        }
        return;
      }

      renderedPausedFrame = false;
      const t = time * 0.001;
      particleUniforms.uTime.value = t;
      gridUniforms.uTime.value = t;
      scrollState.current += (scrollState.target - scrollState.current) * 0.045;
      const logoShift = smoothstep01(scrollState.current / heroTransition.distance);

      mouse.tx += (mouse.x - mouse.tx) * 0.045;
      mouse.ty += (mouse.y - mouse.ty) * 0.045;
      const driftX = Math.sin(t * 0.26) * (isMobile ? 0.8 : 1.6);
      const driftY = Math.cos(t * 0.18) * (isMobile ? 0.55 : 1.1);
      camera.position.x = driftX + mouse.tx * (isMobile ? 2.8 : 4.4);
      camera.position.y = driftY + mouse.ty * (isMobile ? 2 : 3.2);
      camera.lookAt(0, 0, 0);

      const particlePositions = particlePositionAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        particlePositions[i * 3] += velocities[i].x;
        particlePositions[i * 3 + 1] += velocities[i].y;
        particlePositions[i * 3 + 2] += velocities[i].z;

        if (Math.abs(particlePositions[i * 3]) > spread / 2) velocities[i].x *= -1;
        if (Math.abs(particlePositions[i * 3 + 1]) > spread / 2) velocities[i].y *= -1;
        if (Math.abs(particlePositions[i * 3 + 2]) > spread * 0.3) velocities[i].z *= -1;
      }
      particlePositionAttr.needsUpdate = true;

      let lineIdx = 0;
      const lineBuffer = linePositionAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        for (let j = i + 1; j < particleCount; j += 1) {
          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist && lineIdx < lineBuffer.length - 6) {
            lineBuffer[lineIdx] = particlePositions[i * 3];
            lineBuffer[lineIdx + 1] = particlePositions[i * 3 + 1];
            lineBuffer[lineIdx + 2] = particlePositions[i * 3 + 2];
            lineBuffer[lineIdx + 3] = particlePositions[j * 3];
            lineBuffer[lineIdx + 4] = particlePositions[j * 3 + 1];
            lineBuffer[lineIdx + 5] = particlePositions[j * 3 + 2];
            lineIdx += 6;
          }
        }
      }
      lineBuffer.fill(0, lineIdx);
      linePositionAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx / 3);

      if (logoAccent) {
        const floatX = Math.cos(t * 0.48) * lerp(1.9, 0.8, logoShift);
        const floatY = Math.sin(t * 0.86) * lerp(2.8, 1.1, logoShift);

        logoAccent.rotation.x = lerp(
          -0.22 + Math.sin(t * 0.72) * 0.15,
          -0.08 + Math.sin(t * 0.4) * 0.05,
          logoShift
        );
        logoAccent.rotation.y = lerp(
          0.55 + Math.cos(t * 0.44) * 0.24,
          0.16 + Math.cos(t * 0.26) * 0.06,
          logoShift
        );
        logoAccent.rotation.z = lerp(
          -0.12 + Math.sin(t * 0.35) * 0.08,
          -0.03 + Math.sin(t * 0.2) * 0.02,
          logoShift
        );
        logoAccent.position.x = lerp(logoBaseX, logoCornerX, logoShift) + floatX;
        logoAccent.position.y = lerp(logoBaseY, logoCornerY, logoShift) + floatY;
        logoAccent.position.z = lerp(-15, -11, logoShift);
        logoAccent.scale.setScalar(lerp(1, 0.76, logoShift));
      }

      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);

      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      logoGeo?.dispose();
      logoMat?.dispose();
      logoEdgesGeo?.dispose();
      logoEdgesMat?.dispose();
      textGeo?.dispose();
      textMat?.dispose();
      textTexture?.dispose();
      renderer.dispose();
    };
  }, [showHomepageAccent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.96 }}
    />
  );
}
