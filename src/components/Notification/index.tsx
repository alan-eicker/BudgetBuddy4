import classnames from 'classnames';

import Icon from '../Icon';

import { Message } from '../../shared/types/common';

import styles from './Notification.module.scss';

export interface NotificationProps extends Message {}

const Notification = ({ type, message }: NotificationProps) => (
  <div className={classnames(styles.notification, styles[type])}>
    <div className={styles.icon}>
      <Icon name={type} />
    </div>
    <div>{message}</div>
  </div>
);

export default Notification;
