import React from 'react';
import styles from './Switch.module.scss';

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = ({ className = '', ...props }: SwitchProps) => {
  return (
    <label className={`${styles.switch} ${className}`}>
      <input type="checkbox" className={styles.checkbox} {...props} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
