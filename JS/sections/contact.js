import { FormErrors } from '../helpers/error-handler.js';
import { FormValidator } from '../helpers/validator.js';

let ready = false;

export function initContact() {
  if (ready) return;
  ready = true;
  emailjs.init({ publicKey: 'Uj3my_c_YbgJIHSCU' });
  const root = document.getElementById('contact');
  const form = root?.querySelector('#contact-form');
  const inputs = form?.querySelectorAll('input, textarea');
  const toast = root?.querySelector('#contact-form__succes');
  const errorManger = new FormErrors('contact-form');
  const btn = form?.querySelector('button');
  const originalButtonText = btn?.textContent;
  const handleLiveValidation = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isRequired = name !== 'subject';

    FormValidator.validateOneInput(value, name, errorManger, isRequired);
  };

  if (!root || !form) return;
  inputs.forEach((input) => {
    input.addEventListener('input', handleLiveValidation);
  });

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

  async function onSubmit(e) {
    e.preventDefault();
    const isValid = validateALL();
    if (!isValid) return;
    const data = buildData();
    blockBtn(true);
    await sendToEmailjs(data);

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

  function validateALL() {
    let isformValid = true;
    inputs.forEach((i) => {
      const name = i.name;
      const value = i.value;
      const isRequired = name !== 'subject';
      if (!FormValidator.validateOneInput(value, name, errorManger, isRequired)) {
        isformValid = false;
      }
    });
    return isformValid;
  }

  function buildData() {
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      timestamp: new Date().toISOString(),
    };
    return data;
  }
  function blockBtn(shouldBlock) {
    btn.disabled = shouldBlock;

    if (shouldBlock) {
      btn.textContent = 'Wysyłanie…';
    } else {
      btn.textContent = originalButtonText;
    }
  }
  async function sendToEmailjs(data) {
    try {
      await emailjs.send('service_a8h3zl4', 'template_is3z54q', data);
      showToast('Dziękuję! Wiadomość została wysłana ✅');
    } catch (err) {
      console.error(err);
      showToast('Ups… nie udało się wysłać. Spróbuj ponownie.');
    } finally {
      blockBtn(false);
      errorManger.clearAllErrors();
    }
  }
}
