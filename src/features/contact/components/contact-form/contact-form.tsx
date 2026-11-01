'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CONTACT_FIELDS } from '@/features/contact/model/contact.constants';
import { cn } from '@/shared/lib/utils';
import { ContactFormField } from './contact-form.field';
import styles from './contact-form.module.css';
import { useContactForm } from './use-contact-form';

export function ContactForm() {
	const t = useTranslations('contact');
	const { values, errors, status, handleFieldChange, handleSubmit } =
		useContactForm();

	return (
		<form className={styles.form} onSubmit={handleSubmit} noValidate>
			{CONTACT_FIELDS.map((field) => (
				<ContactFormField
					key={field}
					field={field}
					value={values[field]}
					error={errors[field]}
					onValueChange={(value) => handleFieldChange(field, value)}
				/>
			))}
			<div className={styles.footer}>
				<button
					type="submit"
					className={cn(styles.submit, 'mouse-md')}
					disabled={status === 'sending'}
				>
					{status === 'sending' ? t('form.sending') : t('form.submit')}
					<Send size={16} aria-hidden />
				</button>
				{/* biome-ignore lint/a11y/useSemanticElements: output jest elementem inline i zmieniłby układ stopki formularza */}
				<p
					role="status"
					aria-live="polite"
					className={styles.status}
					data-status={status}
				>
					{status === 'sent' && t('form.success')}
					{status === 'failed' && t('form.failure')}
				</p>
			</div>
		</form>
	);
}
