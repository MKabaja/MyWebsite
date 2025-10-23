export async function initHero3D() {
  const splineHeroSlot = document.getElementById('hero-3d');
  const gifSlot = document.getElementById('hero-gif');
  const splineHeroURL = 'https://prod.spline.design/5WiJXakP8n7uKDRs/scene.splinecode';
  const gifURL = 'video/spinning-fireball-21048.gif';

  let initialized_s = false;
  let initialized_g = false;

  const shouldLoad = await shouldLoad3D();

  if (shouldLoad) {
    await splineInit();
  } else {
    gifInit();
  }

  async function shouldLoad3D() {
    const isDesktop = window.matchMedia('(min-width:768px)').matches;
    const cores = navigator.hardwareConcurrency || 2;
    const ram = navigator.deviceMemory || 4;
    const connection = navigator.connection || {};
    const downlink = connection.downlink || 1;
    const effectiveType = connection.effectiveType || 'unknown';

    const goodInternet = downlink > 5 && !['2g', 'slow-2g'].includes(effectiveType);

    const goodHardware = cores >= 4 && ram >= 4;

    const isLowGPU = await isLowPerformanceGPU();

    return isDesktop && goodHardware && goodInternet && !isLowGPU;
  }

  function isLowPerformanceGPU() {
    return new Promise((resolve) => {
      try {
        // 1. Spróbuj utworzyć kontekst WebGL (to jest API dla 3D)
        const canvas = document.createElement('canvas');
        // Zdobądź kontekst WebGL lub jego eksperymentalną wersję
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
          // Jeśli brak wsparcia WebGL - jest bardzo źle
          console.warn('Brak wsparcia WebGL. Ładowanie najprostszej wersji.');
          return resolve(true);
        }

        // 2. Pobranie informacji o GPU
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          // To jest nazwa karty graficznej lub renderera
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';

          console.log(`WebGL Renderer: ${renderer}`);

          // Lista słabych/programowych rendererów, które mogą oznaczać problem
          const lowPerformanceKeywords = [
            'SwiftShader', // Oznacza czysto software'owy rendering (bardzo wolny)
            'Mesa', // Często software'owy rendering na Linuxie
            'Adreno', // Starsze/słabsze GPU w Androidach
            'Mali', // Starsze/słabsze GPU w Androidach
          ];

          const isLow = lowPerformanceKeywords.some((keyword) =>
            renderer.toLowerCase().includes(keyword.toLowerCase()),
          );
          if (isLow) {
            console.warn(`Wykryto słaby renderer: ${renderer}.`);
          }
          return resolve(isLow);
        }
        // Jeśli nie możemy sprawdzić (np. przeglądarka blokuje dostęp do nazwy GPU),
        // zakładamy, że jest bezpiecznie (false), ale logujemy to.
        console.warn('Nie można pobrać nazwy GPU.');
        resolve(false);
      } catch (error) {
        // W razie jakiegokolwiek błędu, zakładamy ostrożnie, że jest słaby sprzęt.
        console.error('Błąd podczas sprawdzania WebGL.', error);
        resolve(true);
      }
    });
  }

  async function splineInit() {
    if (initialized_s) return;
    initialized_s = true;
    if (gifSlot) {
      gifSlot.innerHTML = '';
      gifSlot.classList.add('hidden');
    }
    try {
      await loadSplineScript();
      loadSplineViewer(splineHeroURL, splineHeroSlot);
    } catch (error) {
      console.error('Błąd przy ładowaniu Spline:', error);
      gifInit();
    }
  }

  function loadSplineViewer(url, slot) {
    if (!slot) return;
    slot.classList.remove('hidden');
    const spline = document.createElement('spline-viewer');
    spline.setAttribute('url', url);
    slot.appendChild(spline);
  }

  function loadSplineScript() {
    return new Promise((resolve, reject) => {
      if (window.customElements.get('spline-viewer')) {
        return resolve(); // już załadowany
      }
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.81/build/spline-viewer.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function gifInit() {
    if (initialized_g) return;
    initialized_g = true;
    if (splineHeroSlot) {
      splineHeroSlot.innerHTML = '';
      splineHeroSlot.classList.add('hidden');
    }
    if (!gifSlot) return;
    gifSlot.classList.remove('hidden');
    const img = createImg(gifURL, 'firegif', ['w-3/4']);
    gifSlot.appendChild(img);
  }

  function createImg(imageURL, altinfo, classes = []) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', imageURL);
    imgElement.setAttribute('alt', altinfo);
    if (classes.length > 0) {
      imgElement.classList.add(...classes);
    }
    return imgElement;
  }
}
