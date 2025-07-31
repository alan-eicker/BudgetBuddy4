import React from 'react';
import styles from './HeaderSection.module.scss';

export interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  buttons?: React.ReactNode;
}

const HeaderSection = ({ title, subtitle, buttons }: HeaderSectionProps) => {
  return (
    <div className={styles.headerSection}>
      <div>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      {buttons && <div className={styles.buttonList}>{buttons}</div>}
    </div>
  );
};

export default HeaderSection;
