"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0,1); }`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * 0.24;

  float r = sin(uv.x * 2.5 + t * 1.1 + sin(uv.y * 3.0 + t * 0.7)) * 0.5 + 0.5;
  float g = sin(uv.y * 3.0 + t * 0.8 + cos(uv.x * 2.0 + t * 1.2)) * 0.5 + 0.5;
  float b = sin((uv.x + uv.y) * 2.0 + t * 0.9) * 0.5 + 0.5;

  vec3 c1 = vec3(0.0, 0.83, 1.0);
  vec3 c2 = vec3(0.39, 0.4, 0.95);
  vec3 c3 = vec3(0.06, 0.73, 0.5);
  vec3 c4 = vec3(0.05, 0.07, 0.12);

  vec3 col = mix(c1, c2, r);
  col = mix(col, c3, g * 0.5);
  col = mix(col, c4, 1.0 - b * 0.4);

  float vig = 1.0 - length(uv - 0.5) * 1.2;
  col *= vig * 0.46;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function MeshGradient({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(VERT, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(FRAG, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");

    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, pausedRef.current ? 0 : t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{
        zIndex: 1,
        opacity: 0.82,
        mixBlendMode: "screen",
      }}
    />
  );
}
