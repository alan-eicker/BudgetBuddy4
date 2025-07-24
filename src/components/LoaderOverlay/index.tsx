import { ClockLoader } from 'react-spinners';

import styles from './LoaderOverlay.module.scss';
import { red } from '../../styles/colors';

const LoaderOverlay = ({ heightOffset = 0 }: { heightOffset?: number }) => {
  return (
    <div
      className={styles.loaderOverlay}
      style={
        {
          '--heightOffset': `${heightOffset}px`,
        } as React.CSSProperties
      }
    >
      <ClockLoader color={red} size={65} />
    </div>
  );
};

export default LoaderOverlay;
