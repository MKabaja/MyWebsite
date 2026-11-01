import type { ContactField } from './contact.types';

export const CONTACT_FIELDS: ContactField[] = [
	'name',
	'email',
	'subject',
	'message',
];

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const HOSTILE_CHARACTERS_PATTERN = /[!#$%^&*(){}[\]'";:<>/\\?|~`]+/;
export const MIN_INPUT_LENGTH = 3;
export const MIN_MESSAGE_LENGTH = 20;
