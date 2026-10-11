/** Palette of the WebGL background (GLSL vec3 literals). */
const palette = {
  gradientLeft: "vec3(.058, .036, .022)",
  gradientRight: "vec3(.03, .02, .015)",
  base: "vec4(.22, .115, .03, 0.)",
  specular: "vec4(.25, .62, .66 - (iZoomOffset * 0.02), 1)",
};

export const vertexShader = /* glsl */ `
attribute vec4 position;
varying vec2 fragmentCoordinates;

void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
    fragmentCoordinates = position.xy * 1.;
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 fragmentCoordinates;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform float iZoomOffset;
uniform float iInitialXOffset;
uniform float iPortfolioScrollPercentage;

// Configuration
#define NOISE_STRENGTH 0.08
#define SPECULAR_STRENGTH 0.2
#define ANIMATION_SPEED 0.6
#define DEPTH 60.
#define SEGMENT_QUALITY 1.2

// Shape Definition
float blob(vec3 q) {
    float f = DEPTH;
    f *= (cos(q.z * 1.1)) * (atan(q.x) + 0.2) * (cos(q.y * cos(q.z * 2.)) + 1.0) + cos(q.z * 5. + iTime * ANIMATION_SPEED) * cos(q.x) * sin(q.y) * ((.6 * (1.0)));
    return f;
}

// Gaussian Noise Effect
float gaussian(float z, float u, float o) {
    return (1.0 / (o * sqrt(4.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

void main(void) {

    // Initial color (left to right gradient)
    float mixFactor = gl_FragCoord.x / iResolution.x;
    vec3 gradientColor = mix(${palette.gradientLeft}, ${palette.gradientRight}, mixFactor);
    gl_FragColor = vec4(gradientColor, 1.0);

    vec2 p = -3. + 1.6 * fragmentCoordinates + (iZoomOffset * 0.2);
    vec3 o = vec3(p.x + 14. - (iZoomOffset * 3.0) - (iInitialXOffset * 3.0) - ((1.0 - iMouse.x) * 0.5) + ((iPortfolioScrollPercentage * 5.0) * iZoomOffset), p.y + 2.7 - (iZoomOffset * 0.3) - (iMouse.y * 0.15), -0.35 + (iZoomOffset * 0.4));
    vec3 d = vec3(p.x * 8. + ((1.0 - iMouse.x) * 0.5) - (iZoomOffset * 2.0), p.y + 0.5 + ((1.0 - iMouse.y) * 0.25) - (iZoomOffset * 0.5), 0.8 + (iZoomOffset * 2.0)) / 140.;

    vec4 c = vec4(0.);
    float t = 0.;
    for (int i = 0; i < 140; i++)
    {
        if (blob(o + d * t) < 20.)
        {
            vec3 e = vec3(.1, .0, 2.1 - (iZoomOffset * 0.8));
            vec3 n = vec3(.0);
            n.x = blob(o + d * t) - blob(vec3(o + d * t + e.xyy)) - (iZoomOffset * 4.0);
            n.y = blob(o + d * t) - blob(vec3(o + d * t + e.yxy)) - (iZoomOffset * 7.0);
            n.z = blob(o + d * t) - blob(vec3(o + d * t + e.yyx)) + 1.0;
            n = normalize(n);
            c += max(dot(vec3(0.2 + (iZoomOffset * 0.5 + iInitialXOffset) + (iMouse.x * 0.1), 1.5, -1. - (iZoomOffset * 0.5)), n), .0) + min(dot(vec3(3.0  - (iZoomOffset * 2.0), 10.2 - (iZoomOffset * 3.0), -11. - (iZoomOffset * 3.0)), n), .1) * 0.1;
            break;
        }
        t += SEGMENT_QUALITY;
    }

    // Base Color
    gl_FragColor += ${palette.base} * (0.8 + (iZoomOffset * 0.1));

    // Specular
    gl_FragColor += c * (SPECULAR_STRENGTH + (iZoomOffset * 0.1)) * ${palette.specular};

    // Brightness
    gl_FragColor *= (t * (.03 + (iZoomOffset * 0.04)));

    // Apply Noise
    vec2 ps = vec2(1.0) / iResolution.xy;
    vec2 uv = fragmentCoordinates * ps;
    float seed = dot(uv * vec2(1000.), vec2(12, 52));
    float noise = fract(sin(seed) * 43758.5453 + t);
    noise = gaussian(noise, float(0.0), float(0.5) * float(0.5));
    vec3 grain = vec3(noise) * (1.0 - gl_FragColor.rgb);
    gl_FragColor.rgb -= grain * NOISE_STRENGTH;
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

export function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}
