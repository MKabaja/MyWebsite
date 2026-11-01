import {
	EMAIL_PATTERN,
	HOSTILE_CHARACTERS_PATTERN,
	MIN_INPUT_LENGTH,
	MIN_MESSAGE_LENGTH,
} from '@/features/contact/model/contact.constants';
import type {
	ContactField,
	ValidationError,
} from '@/features/contact/model/contact.types';

/**
 * Sprawdza wartość pola formularza po przycięciu białych znaków.
 *
 * @returns kod błędu albo `null`; puste `subject` jest poprawne, bo to pole opcjonalne
 */
export function validateContactField(
	field: ContactField,
	rawValue: string,
): ValidationError | null {
	const value = rawValue.trim();
	const isRequired = field !== 'subject';

	if (!value) return isRequired ? 'empty' : null;
	if (field === 'email')
		return EMAIL_PATTERN.test(value) ? null : 'invalidEmail';
	if (field === 'message')
		return value.length < MIN_MESSAGE_LENGTH ? 'messageTooShort' : null;
	if (HOSTILE_CHARACTERS_PATTERN.test(value)) return 'illegalChar';
	if (value.length < MIN_INPUT_LENGTH) return 'tooShort';
	return null;
}
