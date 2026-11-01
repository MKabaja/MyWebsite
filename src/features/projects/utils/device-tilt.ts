export type Tilt = { x: number; y: number };

type TiltListener = (tilt: Tilt) => void;
type NeutralPose = { beta: number; gamma: number };
type OrientationEventWithPermission = typeof DeviceOrientationEvent & {
	requestPermission?: () => Promise<string>;
};

const FULL_TILT_IN_DEGREES = 20;
const NEUTRAL_POSE_FOLLOW_RATE_PER_EVENT = 0.015;

const listeners = new Set<TiltListener>();
let neutralPose: NeutralPose | null = null;

/**
 * Nasłuchuje przechyłu telefonu w zakresie -1…1 na obu osiach. Przechył liczony jest względem pozycji
 * neutralnej, która powoli podąża za telefonem, więc znaczenie ma tylko zmiana ułożenia.
 * Wymaga HTTPS; iOS prosi o zgodę przy pierwszym dotknięciu. Subskrybenci dzielą jeden listener.
 *
 * @returns Funkcja kończąca subskrypcję.
 */
export function subscribeTilt(listener: TiltListener) {
	if (!listeners.size) start();
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
		if (!listeners.size) stop();
	};
}

function start() {
	const orientationEvent = getOrientationEvent();
	if (!orientationEvent) return;
	if (orientationEvent.requestPermission)
		window.addEventListener('touchend', askPermission, { once: true });
	else window.addEventListener('deviceorientation', onOrientation);
}

function stop() {
	window.removeEventListener('touchend', askPermission);
	window.removeEventListener('deviceorientation', onOrientation);
	neutralPose = null;
}

function getOrientationEvent(): OrientationEventWithPermission | undefined {
	return window.DeviceOrientationEvent;
}

function askPermission() {
	getOrientationEvent()
		?.requestPermission?.()
		.then((state) => {
			if (state === 'granted' && listeners.size)
				window.addEventListener('deviceorientation', onOrientation);
		})
		.catch(() => {});
}

function onOrientation({ beta, gamma }: DeviceOrientationEvent) {
	if (beta === null || gamma === null) return;
	neutralPose ??= { beta, gamma };
	neutralPose.beta +=
		(beta - neutralPose.beta) * NEUTRAL_POSE_FOLLOW_RATE_PER_EVENT;
	neutralPose.gamma +=
		(gamma - neutralPose.gamma) * NEUTRAL_POSE_FOLLOW_RATE_PER_EVENT;
	const tilt = {
		x: clampToUnitRange((gamma - neutralPose.gamma) / FULL_TILT_IN_DEGREES),
		y: clampToUnitRange((beta - neutralPose.beta) / FULL_TILT_IN_DEGREES),
	};
	for (const listener of listeners) listener(tilt);
}

function clampToUnitRange(value: number) {
	return Math.max(-1, Math.min(1, value));
}
