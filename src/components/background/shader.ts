import { MAX_CELLS } from "./cells";

/**
 * Colours of the background (GLSL literals). Tune the look here.
 * Windows show the full-colour blob, `accent` cells a dodge-tinted strip.
 */
export const palette = {
  gradientLeft: "vec3(.03, .02, .015)",
  gradientRight: "vec3(.02, .015, .012)",
  base: "vec4(.26, .075, .0, 0.)",
  specular: "vec4(.55, .30, .06, 1)",
  accent: "vec3(0.0, 1.0, 0.96)",
};

export const vertexShader = /* glsl */ `
attribute vec4 position;
varying vec2 fragmentCoordinates;

void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
    fragmentCoordinates = position.xy;
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 fragmentCoordinates;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform float iIntro;
uniform vec4 iGrainCells[${MAX_CELLS}];
uniform vec4 iAccentCells[${MAX_CELLS}];

#define GRAIN_STRENGTH 0.9
#define SPECULAR_STRENGTH 0.3
#define ANIMATION_SPEED 0.5
#define DEPTH 30.
#define SEGMENT_QUALITY 5.
#define BRIGHTNESS .024
#define BAND_EDGE .25

float blob(vec3 q) {
    float f = DEPTH;
    f *= (cos(q.z * 1.1)) * (atan(q.x) + 0.5) * (cos(q.z * cos(q.z * 20.)) + 1.0) + cos(q.z * 12. + iTime * ANIMATION_SPEED) * cos(q.x) * sin(q.y) * 1.5;
    return f;
}

vec4 light(vec3 q) {
    vec3 e = vec3(.1, .0, 2.);
    vec3 n = vec3(.0);
    n.x = blob(q) - blob(q + e.xyy);
    n.y = blob(q) - blob(q + e.yxy);
    n.z = blob(q) - blob(q + e.yxx) + 1.0;
    n = normalize(n);
    return vec4(max(dot(vec3(0.2 + iIntro + (iMouse.x * 0.1), 1.5, -1.), n), .0) + min(dot(vec3(3., 10.2, -11.), n), .1) * 0.14);
}

float gaussian(float z, float u, float o) {
    return (1.0 / (o * sqrt(12.))) * exp(-(((z - u) * (z - u)) / (1.5 * (o * o))));
}

bool inCell(vec4 cell, vec2 uv) {
    return cell.z > 0. && uv.x >= cell.x && uv.x <= cell.x + cell.z && uv.y >= cell.y && uv.y <= cell.y + cell.w;
}

void main(void) {
    // uv with origin top-left, matching DOM rects
    vec2 uv = vec2(gl_FragCoord.x / iResolution.x, 1.0 - gl_FragCoord.y / iResolution.y);

    vec3 gradientColor = mix(${palette.gradientLeft}, ${palette.gradientRight}, uv.x);
    gl_FragColor = vec4(gradientColor, 1.0);

    vec2 p = -3. + 1.6 * fragmentCoordinates;
    vec3 o = vec3(p.x + 14. - ((1.0 - iMouse.x) * 0.5), p.y + 2.7 - (iMouse.y * 0.15) + (iIntro * 3.0), -0.35);
    vec3 d = vec3(p.x * 8. + ((1.0 - iMouse.x) * 0.5), p.y + 0.5 + ((1.0 - iMouse.y) * 0.25), 0.8) / 140.;
    vec4 c = vec4(0.);
    float t = 0.;
    float shade = 0.;
    for (int i = 0; i < 40; i++) {
        if (blob(o + d * t) < 30.) {
            // Light and brightness step per segment — that gives the bands. To keep the bands without their
            // pixel-stepped edges, find the exact hit by bisection and, close to a band edge, blend towards the
            // band below (what the neighbouring pixel across the edge shows).
            float a = max(t - SEGMENT_QUALITY, 0.);
            float b = t;
            for (int j = 0; j < 4; j++) {
                float m = (a + b) * 0.5;
                if (blob(o + d * m) < 30.) b = m; else a = m;
            }
            float edge = t > 0. ? 1. - smoothstep(0., BAND_EDGE, (b - (t - SEGMENT_QUALITY)) / SEGMENT_QUALITY) : 0.;
            c = mix(light(o + d * t), light(o + d * (t - SEGMENT_QUALITY)), edge);
            shade = t - SEGMENT_QUALITY * edge;
            break;
        }
        t += SEGMENT_QUALITY;
        shade = t;
    }

    gl_FragColor += ${palette.base};
    gl_FragColor += c * SPECULAR_STRENGTH * ${palette.specular};
    gl_FragColor *= shade * BRIGHTNESS;

    bool grain = false;
    bool accent = false;
    for (int i = 0; i < ${MAX_CELLS}; i++) {
        if (inCell(iGrainCells[i], uv)) grain = true;
        if (inCell(iAccentCells[i], uv)) accent = true;
    }

    if (grain || accent) {
        float gray = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor.rgb = vec3(gray);
        if (accent) {
            vec3 dodge = (gl_FragColor.rgb * 0.35) / (1.0 - ${palette.accent} * 0.6);
            gl_FragColor.rgb = clamp(dodge, 0.05, 1.0);
        } else {
            gl_FragColor.rgb *= 0.45;
            float seed = dot(gl_FragCoord.xy, vec2(12.9898, 78.233));
            float noise = fract(sin(seed) * 43758.5453 + t);
            noise = gaussian(noise, 0.0, 0.25);
            gl_FragColor.rgb -= vec3(noise) * (1.0 - gl_FragColor.rgb) * 0.1 * GRAIN_STRENGTH;
        }
    }

    gl_FragColor.a = 1.0;
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
