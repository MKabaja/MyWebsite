const STILL_FRAME_TIME_IN_SECONDS = 1;

/**
 * Zatrzymuje wszystkie wideo na stronie (także te, które staną się gotowe później) i pokazuje kadr zastępczy, gdy nie mają plakatu.
 *
 * @returns funkcja przywracająca `autoplay` i usuwająca nasłuchy
 */
export function holdVideosStill() {
	const videos = Array.from(
		document.querySelectorAll<HTMLVideoElement>('video'),
	);
	const autoplayStates = videos.map((video) => video.autoplay);
	const frameListeners = new Map<HTMLVideoElement, () => void>();

	for (const video of videos) {
		video.autoplay = false;
		video.pause();
		if (!video.poster) {
			showStillFrameWhenReady(video, frameListeners);
		}
		video.addEventListener('play', stopVideo);
	}

	return () => {
		videos.forEach((video, index) => {
			video.removeEventListener('play', stopVideo);
			const listener = frameListeners.get(video);
			if (listener) video.removeEventListener('loadedmetadata', listener);
			video.autoplay = autoplayStates[index];
		});
	};
}

function showStillFrameWhenReady(
	video: HTMLVideoElement,
	frameListeners: Map<HTMLVideoElement, () => void>,
) {
	function showFrame() {
		if (video.duration > STILL_FRAME_TIME_IN_SECONDS)
			video.currentTime = STILL_FRAME_TIME_IN_SECONDS;
	}

	if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
		showFrame();
		return;
	}
	frameListeners.set(video, showFrame);
	video.addEventListener('loadedmetadata', showFrame, { once: true });
}

function stopVideo({ currentTarget }: Event) {
	if (currentTarget instanceof HTMLVideoElement) currentTarget.pause();
}
