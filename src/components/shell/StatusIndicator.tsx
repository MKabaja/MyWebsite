import styles from "./StatusIndicator.module.css";

export function StatusIndicator({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`${styles.indicator} ${className}`}>
      <span className={styles.light} aria-hidden /> {label}
    </div>
  );
}
