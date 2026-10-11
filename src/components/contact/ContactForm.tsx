"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { validateField, type ContactField, type ValidationError } from "@/lib/validation";
import styles from "./ContactForm.module.css";

type Values = Record<ContactField, string>;
type Errors = Partial<Record<ContactField, ValidationError | null>>;
type Status = "idle" | "sending" | "sent" | "failed";

const FIELDS: ContactField[] = ["name", "email", "subject", "message"];
const EMPTY: Values = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField;
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = Object.fromEntries(FIELDS.map((field) => [field, validateField(field, values[field])])) as Errors;
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      if (window.matchMedia("(max-width: 991px)").matches) {
        event.currentTarget.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      }
      return;
    }

    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
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
      setStatus("sent");
      setValues(EMPTY);
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  const renderField = (field: ContactField) => {
    const error = errors[field];
    const isValid = error === null && values[field].trim() !== "";
    const commonProps = {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      onChange: handleChange,
      placeholder: t(`form.${field}Placeholder`),
      required: field !== "subject",
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      className: `${styles.control} ${error ? styles.invalid : ""}`,
    };

    return (
      <div key={field} className={`${styles.group} ${field === "subject" || field === "message" ? styles.wide : ""}`}>
        <label htmlFor={`contact-${field}`} className={styles.label}>
          {t(`form.${field}`)}
          {isValid && <Check size={14} className={styles.valid} aria-hidden />}
        </label>
        {field === "message" ? (
          <textarea rows={5} {...commonProps} />
        ) : (
          <input type={field === "email" ? "email" : "text"} autoComplete={field === "subject" ? "off" : field} {...commonProps} />
        )}
        {error && (
          <p id={`contact-${field}-error`} role="alert" className={styles.error}>
            {t(`errors.${error}`)}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {FIELDS.map(renderField)}
      <div className={styles.footer}>
        <button type="submit" className={`${styles.submit} mouse-md`} disabled={status === "sending"}>
          {status === "sending" ? t("form.sending") : t("form.submit")}
          <Send size={16} aria-hidden />
        </button>
        <p role="status" aria-live="polite" className={styles.status} data-status={status}>
          {status === "sent" && t("form.success")}
          {status === "failed" && t("form.failure")}
        </p>
      </div>
    </form>
  );
}
