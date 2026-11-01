'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import type {
	ContactField,
	ValidationError,
} from '@/features/contact/model/contact.types';
import { cn } from '@/shared/lib/utils';
import styles from './contact-form.module.css';

type ContactFormFieldProps = {
	field: ContactField;
	value: string;
	error?: ValidationError | null;
	onValueChange: (value: string) => void;
};

export function ContactFormField({
	field,
	value,
	error,
	onValueChange,
}: ContactFormFieldProps) {
	const t = useTranslations('contact');
	const isValid = error === null && value.trim() !== '';

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		onValueChange(event.target.value);
	}

	const controlProps = {
		id: `contact-${field}`,
		name: field,
		value,
		onChange: handleChange,
		placeholder: t(`form.${field}Placeholder`),
		required: field !== 'subject',
		'aria-invalid': Boolean(error),
		'aria-describedby': error ? `contact-${field}-error` : undefined,
		className: cn(styles.control, error && styles.invalid),
	};

	return (
		<div
			className={cn(
				styles.group,
				(field === 'subject' || field === 'message') && styles.wide,
			)}
		>
			<label htmlFor={`contact-${field}`} className={styles.label}>
				{t(`form.${field}`)}
				{isValid && <Check size={14} className={styles.valid} aria-hidden />}
			</label>
			{field === 'message' ? (
				<textarea rows={5} {...controlProps} />
			) : (
				<input
					type={field === 'email' ? 'email' : 'text'}
					autoComplete={field === 'subject' ? 'off' : field}
					{...controlProps}
				/>
			)}
			{error && (
				<p id={`contact-${field}-error`} role="alert" className={styles.error}>
					{t(`errors.${error}`)}
				</p>
			)}
		</div>
	);
}
