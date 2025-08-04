import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef(
  (
    { error, label, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={ref}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';
export default Input;