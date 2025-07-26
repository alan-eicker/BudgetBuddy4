import { useEffect, useState } from 'react';
import classnames from 'classnames';

import Button from '../Button';

import styles from './ConfirmationSlider.module.scss';

export interface ConfirmationSliderProps {
  text?: string;
  postion?: 'left' | 'right';
  isActive: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationSlider = ({
  onCancel,
  onConfirm,
  text = 'Are you sure?',
  postion = 'right',
  isActive = false,
}: ConfirmationSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(activeIndex);
  }, [activeIndex]);

  return (
    <div
      className={classnames(styles.confirmationSlider, ...[styles[postion]], {
        [styles.isActive]: isActive,
      })}
    >
      <div>{text}</div>
      <div className={styles.confirmationActionButtons}>
        <Button text="OK" variant="white" size="sm" onClick={onConfirm} />
        <Button text="Cancel" variant="white" size="sm" onClick={onCancel} />
      </div>
    </div>
  );
};

export default ConfirmationSlider;
