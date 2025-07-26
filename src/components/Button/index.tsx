import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  text,
  icon,
  variant,
  size = 'md',
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      className={classnames(styles.button, {
        [styles.tertiary]: variant === 'tertiary',
        [styles.secondary]: variant === 'secondary',
        [styles[size]]: size,
      })}
      {...otherProps}
    >
      {icon} <span>{text}</span>
    </button>
  );
};

export default Button;
