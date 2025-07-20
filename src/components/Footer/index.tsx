import React from 'react';
import styles from './Footer.module.scss';

export interface FooterProps {
  copyrightText: string;
}

const Footer = ({ copyrightText }: FooterProps) => {
  return <footer className={styles.footer}>&copy; {copyrightText}</footer>;
};

export default Footer;
