'use client';

import { type FormEvent, useState } from 'react';
import { CONTACT_FIELDS } from '@/features/contact/model/contact.constants';
import type {
	ContactField,
	ValidationError,
} from '@/features/contact/model/contact.types';
import { validateContactField } from '@/features/contact/utils/validate-contact-field';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';
import { site } from '@/shared/lib/site';

type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, ValidationError | null>>;
type ContactStatus = 'idle' | 'sending' | 'sent' | 'failed';

const EMPTY_VALUES: ContactValues = {
	name: '',
	email: '',
	subject: '',
	message: '',
};

export function useContactForm() {
	const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
	const [errors, setErrors] = useState<ContactErrors>({});
	const [status, setStatus] = useState<ContactStatus>('idle');

	function handleFieldChange(field: ContactField, value: string) {
		setValues((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({
			...current,
			[field]: validateContactField(field, value),
		}));
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validateContactValues(values);
		setErrors(nextErrors);
		const firstInvalidField = CONTACT_FIELDS.find((field) => nextErrors[field]);
		if (firstInvalidField) {
			if (matchesMedia(mediaQueries.narrow)) {
				event.currentTarget
					.querySelector<HTMLElement>(`#contact-${firstInvalidField}`)
					?.focus();
			}
			return;
		}

		setStatus('sending');
		try {
			await sendContactMessage(values);
			setStatus('sent');
			setValues(EMPTY_VALUES);
			setErrors({});
		} catch (error) {
			console.error(error);
			setStatus('failed');
		}
	}

	return { values, errors, status, handleFieldChange, handleSubmit };
}

function validateContactValues(values: ContactValues) {
	const errors: ContactErrors = {};
	for (const field of CONTACT_FIELDS) {
		errors[field] = validateContactField(field, values[field]);
	}
	return errors;
}

async function sendContactMessage(values: ContactValues) {
	const { default: emailjs } = await import('@emailjs/browser');
	await emailjs.send(
		site.emailjs.serviceId,
		site.emailjs.templateId,
		{
			name: values.name.trim(),
			email: values.email.trim(),
			subject: values.subject.trim(),
			message: values.message.trim(),
			timestamp: new Date().toISOString(),
		},
		{ publicKey: site.emailjs.publicKey },
	);
}
