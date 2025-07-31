import classnames from 'classnames';

import {
  MdErrorOutline,
  MdWarningAmber,
  MdCheck,
  MdInfoOutline,
} from 'react-icons/md';

import styles from './Notification.module.scss';

import { Message } from '../../shared/types/common';

export interface NotificationProps extends Message {}

const Notification = ({ type, message }: NotificationProps) => {
  const IconComponent = () => {
    let IconComponent: React.FC;

    switch (type) {
      case 'error':
        IconComponent = MdErrorOutline as unknown as React.FC;
        break;
      case 'warning':
        IconComponent = MdWarningAmber as unknown as React.FC;
        break;
      case 'success':
        IconComponent = MdCheck as unknown as React.FC;
        break;
      case 'info':
        IconComponent = MdInfoOutline as unknown as React.FC;
        break;
      default:
        IconComponent = MdInfoOutline as unknown as React.FC;
    }

    return <IconComponent />;
  };
  return (
    <div className={classnames(styles.notification, styles[type])}>
      <div className={styles.icon}>
        <IconComponent />
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Notification;
