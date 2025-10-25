// Obiekt przechowujący stałe komunikaty o błędach
const ERRORS = {
  E_VALUE_TOO_LONG: 'Wartość jest za długa!',
  E_VALUE_TOO_SHORT: 'Wartość jest za krótka! (Min. 3 znaki)',
  E_VALUE_EMPTY: 'Pole jest wymagane i nie może być puste.',
  E_ILLEGAL_CHAR: 'Pole zawiera niedozwolone symbole, takie jak cudzysłowy!',
  E_INVALID_EMAIL: 'Wprowadzony e-mail ma nieprawidłowy format.',
  E_MESSAGE_TOO_SHORT: 'Wiadomość musi mieć minimum 20 znaków.',
};

export class FormValidator {
  static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Zakazane znaki (wszystko, co nie jest litera/cyfra/spacja/kropka/małpa/myślnik/podkreślenie/przecinek)
  static hostileChars = /[!#$%^&*(){}\[\]'";:<>\/\\?|~`]+/;

  // Minimalne długości
  static minInputLength = 3;
  static minMessageLength = 20;

  static validateOneInput(inputValue, name, formErrors, isRequired = true) {
    const value = String(inputValue ?? '').trim();

    if (isRequired && !value) {
      formErrors.showError(name, ERRORS.E_VALUE_EMPTY);
      return false;
    }

    if (!isRequired && !value) {
      return true;
    }

    if (name !== 'email' && FormValidator.hostileChars.test(value)) {
      formErrors.showError(name, ERRORS.E_ILLEGAL_CHAR);
      return false;
    }

    if (name === 'email' && !FormValidator.emailRegex.test(value)) {
      formErrors.showError(name, ERRORS.E_INVALID_EMAIL);
      return false;
    }

    if (name !== 'message' && value.length < FormValidator.minInputLength) {
      formErrors.showError(name, ERRORS.E_VALUE_TOO_SHORT);
      return false;
    }

    if (name === 'message' && value.length < FormValidator.minMessageLength) {
      formErrors.showError(name, ERRORS.E_MESSAGE_TOO_SHORT);
      return false;
    }

    formErrors.clearError(name);
    formErrors.showPossitive(name, '✅');
    return true;
  }
}
