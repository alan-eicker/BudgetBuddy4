import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ text, variant, size = 'md', ...otherProps }: ButtonProps) => {
  return (
    <button
      className={classnames(styles.button, {
        [styles.tertiary]: variant === 'tertiary',
        [styles.secondary]: variant === 'secondary',
        [styles[size]]: size,
      })}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default Button;
