"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import styles from "@/components/hero/terminal-webgl-glitch.module.css";

type TerminalWebGlGlitchProps = {
  children: ReactNode;
  className?: string;
  interval?: number;
  duration?: number;
  intensity?: number;
  slices?: number;
  shift?: number;
  rgbShift?: number;
  blocks?: number;
  noise?: number;
};

const MAX_CAPTURE_DPR = 1.5;

// html2canvas predates CSS Color 4. Normalize the cloned terminal's computed
// colors to sRGB while leaving the live theme and its color-mix tokens intact.
function normalizeCaptureColors(document: Document, content: HTMLElement) {
  const context = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const view = document.defaultView;
  if (!context || !view) return;
  const properties = ["color", "background-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "outline-color", "text-decoration-color", "fill", "stroke"];

  for (const element of [content, ...content.querySelectorAll<HTMLElement | SVGElement>("*")]) {
    const computed = view.getComputedStyle(element);
    for (const property of properties) {
      const value = computed.getPropertyValue(property);
      if (!/(?:oklch|oklab|lab|lch|color|color-mix)\(/.test(value)) continue;
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
      element.style.setProperty(property, `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`, "important");
    }
  }
}

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uContent;
  uniform vec2 uResolution;
  uniform float uSeed;
  uniform float uAmp;
  uniform float uSlices;
  uniform float uShift;
  uniform float uRgbShift;
  uniform float uBlocks;
  uniform float uNoise;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  vec4 sampleContent(vec2 position) {
    return texture2D(uContent, vec2(clamp(position.x, 0.0005, 0.9995), 1.0 - position.y));
  }

  void main() {
    vec2 position = vUv;
    float amplitude = uAmp;

    if (amplitude > 0.001) {
      float band = floor(position.y * uSlices);
      float pick = hash12(vec2(band, uSeed));
      float tear = step(1.0 - 0.3 * min(amplitude, 1.0), pick);
      float direction = hash12(vec2(band, uSeed + 13.0)) * 2.0 - 1.0;
      position.x += tear * direction * amplitude * uShift / uResolution.x;

      float microBand = floor(position.y * uSlices * 7.0);
      float micro = hash12(vec2(microBand, uSeed + 29.0));
      position.x += (micro - 0.5) * amplitude * uNoise * 3.0 / uResolution.x;

      vec2 cell = floor(position * vec2(10.0, uSlices * 0.5));
      float block = hash12(cell + uSeed * 0.0173);
      if (block > 1.0 - 0.14 * uBlocks * min(amplitude, 1.0)) {
        position += vec2(
          hash12(cell + uSeed + 3.1) - 0.5,
          hash12(cell + uSeed + 7.7) - 0.5
        ) * vec2(0.08, 0.02) * amplitude;
      }
    }

    float split = uRgbShift * amplitude / uResolution.x;
    vec4 base = sampleContent(position);
    float red = sampleContent(position + vec2(split, 0.0)).r;
    float blue = sampleContent(position - vec2(split, 0.0)).b;
    vec4 color = vec4(red, base.g, blue, base.a);

    if (amplitude > 0.001 && uNoise > 0.001) {
      float grain = hash12(vUv * uResolution + uSeed * 5.3) - 0.5;
      float row = floor(vUv.y * uResolution.y);
      float line = step(0.985 - 0.01 * uNoise * amplitude, hash12(vec2(row, uSeed + 41.0)));
      color.rgb += (grain * 0.22 + line * 0.35) * uNoise * min(amplitude, 1.0) * color.a;
    }

    gl_FragColor = vec4(clamp(color.rgb, 0.0, 1.0) * color.a, color.a);
  }
`;

const subscribeToMotionPreference = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getMotionPreference = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TerminalWebGlGlitch({
  blocks = 0.5,
  children,
  className,
  duration = 0.4,
  intensity = 1,
  interval = 5,
  noise = 0.35,
  rgbShift = 4,
  shift = 30,
  slices = 24,
}: TerminalWebGlGlitchProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => true,
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const content = contentRef.current;
    const output = outputRef.current;
    const gl = output?.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!content || !output || !gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compileShader(gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!buffer || !texture) {
      if (buffer) gl.deleteBuffer(buffer);
      if (texture) gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uniforms = {
      blocks: gl.getUniformLocation(program, "uBlocks"),
      content: gl.getUniformLocation(program, "uContent"),
      noise: gl.getUniformLocation(program, "uNoise"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      rgbShift: gl.getUniformLocation(program, "uRgbShift"),
      seed: gl.getUniformLocation(program, "uSeed"),
      shift: gl.getUniformLocation(program, "uShift"),
      slices: gl.getUniformLocation(program, "uSlices"),
      amplitude: gl.getUniformLocation(program, "uAmp"),
    };

    let animationFrame = 0;
    let isDisposed = false;
    let isCapturing = false;
    let lastInteraction = -Infinity;

    const clear = () => {
      window.cancelAnimationFrame(animationFrame);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    const interrupt = () => {
      lastInteraction = performance.now();
      clear();
    };
    content.addEventListener("pointerdown", interrupt);
    content.addEventListener("keydown", interrupt);
    content.addEventListener("input", interrupt);
    content.addEventListener("scroll", interrupt, true);
    document.addEventListener("visibilitychange", interrupt);

    const render = (amplitude: number, seed: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_CAPTURE_DPR);
      const width = Math.max(1, Math.round(output.clientWidth * dpr));
      const height = Math.max(1, Math.round(output.clientHeight * dpr));
      if (output.width !== width || output.height !== height) {
        output.width = width;
        output.height = height;
      }

      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.content, 0);
      gl.uniform2f(uniforms.resolution, output.width, output.height);
      gl.uniform1f(uniforms.seed, seed);
      gl.uniform1f(uniforms.amplitude, amplitude * intensity);
      gl.uniform1f(uniforms.slices, slices);
      gl.uniform1f(uniforms.shift, shift * dpr);
      gl.uniform1f(uniforms.rgbShift, rgbShift * dpr);
      gl.uniform1f(uniforms.blocks, blocks);
      gl.uniform1f(uniforms.noise, noise);
      gl.viewport(0, 0, output.width, output.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const burst = async () => {
      if (isCapturing || isDisposed || document.hidden || gl.isContextLost()) return;
      const bounds = content.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight || bounds.width === 0) return;
      if (performance.now() - lastInteraction < 600) return;
      const interactionAtCapture = lastInteraction;
      isCapturing = true;

      try {
        const { default: capture } = await import("html2canvas");
        const snapshot = await capture(content, {
          backgroundColor: null,
          logging: false,
          scale: Math.min(window.devicePixelRatio || 1, MAX_CAPTURE_DPR),
          onclone: normalizeCaptureColors,
        });
        if (isDisposed || document.hidden || lastInteraction !== interactionAtCapture) return;

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          snapshot,
        );

        const startedAt = performance.now();
        const seed = Math.random() * 1000;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / (duration * 1000), 1);
          render(1 - progress * progress, seed + now * 0.024);
          if (progress < 1 && !isDisposed) {
            animationFrame = window.requestAnimationFrame(animate);
          } else {
            clear();
          }
        };
        animationFrame = window.requestAnimationFrame(animate);
      } catch {
        // The live terminal remains usable if capture or WebGL is unavailable.
        if (!isDisposed) clear();
      } finally {
        isCapturing = false;
      }
    };

    const intervalId = window.setInterval(burst, interval * 1000);

    return () => {
      isDisposed = true;
      window.clearInterval(intervalId);
      window.cancelAnimationFrame(animationFrame);
      content.removeEventListener("pointerdown", interrupt);
      content.removeEventListener("keydown", interrupt);
      content.removeEventListener("input", interrupt);
      content.removeEventListener("scroll", interrupt, true);
      document.removeEventListener("visibilitychange", interrupt);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [blocks, duration, intensity, interval, noise, prefersReducedMotion, rgbShift, shift, slices]);

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
      {!prefersReducedMotion && (
        <canvas
          aria-hidden="true"
          className={styles.output}
          ref={outputRef}
        />
      )}
    </div>
  );
}
