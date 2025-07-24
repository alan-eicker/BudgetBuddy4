import ContentLoader from 'react-content-loader';
import styles from './ExpenseGroupPageLoader.module.scss';

const ExpenseGroupPageLoader = () => {
  return (
    <div>
      <div className={styles.header}>
        <ContentLoader viewBox="0 0 800 60" height={60} width={800}>
          <rect x="0" y="0" rx="4" ry="4" width="800" height="30" />
          <rect x="0" y="45" rx="4" ry="4" width="350" height="20" />
        </ContentLoader>
        <div className={styles.buttons}>
          <ContentLoader viewBox="0 0 100 40" height={40} width={100}>
            <rect x="0" y="0" rx="4" ry="4" width="800" height="40" />
          </ContentLoader>
          <ContentLoader viewBox="0 0 100 40" height={40} width={100}>
            <rect x="0" y="0" rx="4" ry="4" width="800" height="40" />
          </ContentLoader>
          <ContentLoader viewBox="0 0 100 40" height={40} width={100}>
            <rect x="0" y="0" rx="4" ry="4" width="800" height="40" />
          </ContentLoader>
        </div>
      </div>
      <div className={styles.expenseItems}>
        <ContentLoader viewBox="0 0 1024 120" height={120} width={1024}>
          <rect x="0" y="0" rx="4" ry="4" width="1024" height="100" />
        </ContentLoader>
        <ContentLoader viewBox="0 0 1024 120" height={120} width={1024}>
          <rect x="0" y="0" rx="4" ry="4" width="1024" height="100" />
        </ContentLoader>
        <ContentLoader viewBox="0 0 1024 120" height={120} width={1024}>
          <rect x="0" y="0" rx="4" ry="4" width="1024" height="100" />
        </ContentLoader>
        <ContentLoader viewBox="0 0 1024 120" height={120} width={1024}>
          <rect x="0" y="0" rx="4" ry="4" width="1024" height="100" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default ExpenseGroupPageLoader;
