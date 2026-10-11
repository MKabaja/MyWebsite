/**
 * Phone tilt as -1…1 on both axes, relative to how the phone is being held: the neutral pose slowly
 * follows the current one, so holding it upright, flat or lying down all start at 0 and only a change
 * of tilt moves things. Needs HTTPS; iOS asks for permission on the first tap.
 * One `deviceorientation` listener is shared by all subscribers and removed with the last one.
 */
export type Tilt = { x: number; y: number };

/** Degrees of tilt (away from the neutral pose) that reach ±1. */
const RANGE = 20;
/** How fast the neutral pose follows the phone, per event (~60 per second). */
const FOLLOW = 0.015;

type OrientationWithPermission = { requestPermission?: () => Promise<string> };

const listeners = new Set<(tilt: Tilt) => void>();
let neutral: { beta: number; gamma: number } | null = null;

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

const onOrientation = ({ beta, gamma }: DeviceOrientationEvent) => {
  if (beta === null || gamma === null) return;
  neutral ??= { beta, gamma };
  neutral.beta += (beta - neutral.beta) * FOLLOW;
  neutral.gamma += (gamma - neutral.gamma) * FOLLOW;
  const tilt = { x: clamp((gamma - neutral.gamma) / RANGE), y: clamp((beta - neutral.beta) / RANGE) };
  listeners.forEach((listener) => listener(tilt));
};

const askPermission = () => {
  (window.DeviceOrientationEvent as unknown as OrientationWithPermission).requestPermission?.()
    .then((state) => state === "granted" && listeners.size && window.addEventListener("deviceorientation", onOrientation))
    .catch(() => {});
};

const start = () => {
  const Orientation = window.DeviceOrientationEvent as unknown as OrientationWithPermission | undefined;
  if (!Orientation) return;
  if (Orientation.requestPermission) window.addEventListener("touchend", askPermission, { once: true });
  else window.addEventListener("deviceorientation", onOrientation);
};

const stop = () => {
  window.removeEventListener("touchend", askPermission);
  window.removeEventListener("deviceorientation", onOrientation);
  neutral = null;
};

export function subscribeTilt(listener: (tilt: Tilt) => void) {
  if (!listeners.size) start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) stop();
  };
}
