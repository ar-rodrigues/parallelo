const PHONE_CHARS = /^[\d\s+().-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 10;

/** Filtra caracteres no válidos mientras el usuario escribe. */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d\s+().-]/g, "");
}

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed || !PHONE_CHARS.test(trimmed)) return false;
  return trimmed.replace(/\D/g, "").length >= MIN_PHONE_DIGITS;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function isValidMessage(message: string): boolean {
  return message.trim().length > 0;
}

export function isHoneypotTriggered(value: string | undefined): boolean {
  return Boolean(value?.trim());
}
