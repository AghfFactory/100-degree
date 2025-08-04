import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  ...props
}) => (
  <button
    className={`${styles.button} ${styles[variant]}`}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? (
      <span className={styles.spinner} aria-label="Loading" />
    ) : (
      children
    )}
  </button>
);

export default Button;