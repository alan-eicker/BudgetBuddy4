import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Button = ({ text, variant }: ButtonProps) => {
  return (
    <button
      className={classnames(styles.button, {
        [styles.tertiary]: variant === 'tertiary',
        [styles.secondary]: variant === 'secondary',
      })}
    >
      {text}
    </button>
  );
};

export default Button;
