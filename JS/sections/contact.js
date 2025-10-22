let ready = false;
export function initContact() {
  if (ready) return;
  ready = true;

  const root = document.getElementById('contact');
  const form = root?.querySelector('#contact-form');
  const toast = root?.querySelector('#contact-form__succes');

  if (!root || !form) return;

  let toastTimer = null;

  function showToast(msg = 'Wiadomość wysłana! wkrótce odpowiem!') {
    if (!toast) return;

    toast.textContent = msg;

    toast.classList.remove('hidden', 'opacity-0');
    requestAnimationFrame(() => toast.classList.add('opacity-100'));

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 2500);
  }

  function hideToast() {
    if (!toast) return;
    const onEnd = (e) => {
      if (e.propertyName !== 'opacity') return;
      toast.removeEventListener('transitionend', onEnd);
      toast.classList.add('hidden');
    };
    toast.addEventListener('transitionend', onEnd, { once: true });
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }

  function onSubmit(e) {
    e.preventDefault();
    showToast();
    form.reset();
  }

  const addHandler = () => {
    if (form.__submitHandlerAttached) return;
    form.addEventListener('submit', onSubmit);
    form.__submitHandlerAttached = true;
  };

  const removeHandler = () => {
    if (!form.__submitHandlerAttached) return;
    form.removeEventListener('submit', onSubmit);
    form.__submitHandlerAttached = false;
  };

  addHandler();

  return function abortContact() {
    removeHandler();
    if (toastTimer) clearTimeout(toastTimer);
    ready = false;
  };
}
