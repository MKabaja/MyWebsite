export async function initModels3D() {
  const splineHeroSlot = document.getElementById('hero-3d');
  const splineAbautSlot = document.getElementById('abaut-3d');
  const gifSlot = document.getElementById('hero-gif');
  const imgSlot = document.getElementById('foto');
  const splineHeroURL = 'https://prod.spline.design/5WiJXakP8n7uKDRs/scene.splinecode';
  const splineAbautURL = 'https://prod.spline.design/akDHOzTo50SWLgPr/scene.splinecode';
  const gifURL = '/video/spinning-fireball-21048.gif';
  const imgURL = '/images/M.Kabaja-beztła.png';

  let initialized_s = false;
  let initialized_g = false;

  const shouldLoad = await shouldLoad3D();

  if (shouldLoad) {
    console.log('powinien byc model', shouldLoad);
    await splineInit();
  } else {
    gifInit();
    console.log('powinien byc  gif', shouldLoad);
  }

  async function shouldLoad3D() {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    // Sprzęt
    const cores = navigator.hardwareConcurrency ?? 4; // jeśli brak – nie zaniżam
    const ram = navigator.deviceMemory; // może być undefined
    const goodHardware = cores >= 4 && (ram ? ram >= 4 : true);

    // Sieć
    const conn = navigator.connection;
    const downlink = typeof conn?.downlink === 'number' ? conn.downlink : null;
    const eff = conn?.effectiveType;
    const saveData = conn?.saveData === true;
    const isFastType = eff ? ['4g', '5g'].includes(eff) : true; // unknown => OK
    const hasEnoughDownlink = downlink === null ? true : downlink >= 2; // 2
    const goodInternet = !saveData && (isFastType || hasEnoughDownlink);

    // Preferencje dostępności
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // GPU (jeśli nie da się ocenić – NIE blokuje)
    let isLowGPU = false;
    try {
      isLowGPU = await isLowPerformanceGPU();
    } catch {
      isLowGPU = false;
    }

    const result = isDesktop && !prefersReducedMotion && goodHardware && goodInternet && !isLowGPU;

    console.log(
      '[3D gate] desktop:',
      isDesktop,
      '| hw:',
      goodHardware,
      `(cores=${cores}, ram=${ram ?? 'unknown'})`,
      '| net:',
      goodInternet,
      `(downlink=${downlink ?? 'unknown'}, eff=${eff ?? 'unknown'})`,
      '| reduceMotion:',
      prefersReducedMotion,
      '| lowGPU:',
      isLowGPU,
      '| =>',
      result,
    );

    return result;
  }
  function isLowPerformanceGPU() {
    return new Promise((resolve) => {
      try {
        const canvas = document.createElement('canvas');

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
          console.warn('Brak wsparcia WebGL. Ładowanie najprostszej wersji.');
          return resolve(true);
        }

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          // To jest nazwa karty graficznej lub renderera
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';

          console.log(`WebGL Renderer: ${renderer}`);

          // Lista słabych/programowych rendererów, które mogą oznaczać problem
          const lowPerformanceKeywords = [
            'SwiftShader',
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
      hidePlaceholders();
    }
    try {
      await loadSplineScript();
      loadSplineViewers();
      show3DSlots();
    } catch (error) {
      console.error('Błąd przy ładowaniu Spline:', error);
      gifInit();
    }
  }

  function createSplineViewer(url, classes = []) {
    const spline = document.createElement('spline-viewer');
    spline.setAttribute('url', url);
    if (classes.length > 0) {
      spline.classList.add(...classes);
    }
    spline.addEventListener(
      'error',
      () => {
        console.warn('Spline viewer error → fallback to GIF');
        gifInit();
      },
      { once: true },
    );
    return spline;
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
      hide3DSlots();
    }
    if (!gifSlot || !imgSlot) return;
    loadPlaceholders();
    showPlaceholders();
  }

  function createImg(imageURL, altinfo, classes = []) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', imageURL);
    imgElement.setAttribute('alt', altinfo);
    imgElement.loading = 'lazy';
    imgElement.decoding = 'async';
    imgElement.fetchPriority = 'high';
    if (classes.length > 0) {
      imgElement.classList.add(...classes);
    }
    return imgElement;
  }
  function hidePlaceholders() {
    if (gifSlot) {
      gifSlot.innerHTML = '';
      gifSlot.classList.add('hidden');
    }
    if (imgSlot) {
      imgSlot.innerHTML = '';
      imgSlot.classList.add('hidden');
    }
  }
  function hide3DSlots() {
    if (splineHeroSlot) {
      splineHeroSlot.innerHTML = '';
      splineHeroSlot.classList.add('hidden');
    }
    if (splineAbautSlot) {
      splineAbautSlot.innerHTML = '';
      splineAbautSlot.classList.add('hidden');
    }
  }

  function show3DSlots() {
    splineHeroSlot?.classList.remove('hidden');
    splineAbautSlot?.classList.remove('hidden');
  }
  function showPlaceholders() {
    gifSlot?.classList.remove('hidden');
    imgSlot?.classList.remove('hidden');
  }
  function loadSplineViewers() {
    const SP_HERO = createSplineViewer(splineHeroURL);
    const SP_ABAUT = createSplineViewer(splineAbautURL, [
      'h-[150%]',
      'w-[150%]',
      'mix-blend-lighten',
    ]);
    splineHeroSlot?.appendChild(SP_HERO);
    splineAbautSlot?.appendChild(SP_ABAUT);
  }
  function loadPlaceholders() {
    const gif = createImg(gifURL, 'Fireball', ['w-3/4']);
    const img = createImg(imgURL, 'Mateusz');
    gifSlot?.appendChild(gif);
    imgSlot?.appendChild(img);
  }
}
