export type ContactField = "name" | "email" | "subject" | "message";
export type ValidationError = "empty" | "tooShort" | "illegalChar" | "invalidEmail" | "messageTooShort";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const HOSTILE_CHARS = /[!#$%^&*(){}[\]'";:<>/\\?|~`]+/;
const MIN_INPUT_LENGTH = 3;
const MIN_MESSAGE_LENGTH = 20;

/** Same rules as the contact form of the previous site. `subject` is optional. */
export function validateField(field: ContactField, rawValue: string): ValidationError | null {
  const value = rawValue.trim();
  const isRequired = field !== "subject";

  if (!value) return isRequired ? "empty" : null;
  if (field === "email") return EMAIL_PATTERN.test(value) ? null : "invalidEmail";
  if (field === "message") return value.length < MIN_MESSAGE_LENGTH ? "messageTooShort" : null;
  if (HOSTILE_CHARS.test(value)) return "illegalChar";
  if (value.length < MIN_INPUT_LENGTH) return "tooShort";
  return null;
}
