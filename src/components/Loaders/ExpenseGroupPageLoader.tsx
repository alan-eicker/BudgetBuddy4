import ContentLoader from 'react-content-loader';

const ExpenseGroupPageLoader = () => {
  return (
    <div>
      <ContentLoader viewBox="0 0 800 130" height={130} width={800}>
        <rect x="0" y="0" rx="4" ry="4" width="800" height="30" />
        <rect x="0" y="45" rx="4" ry="4" width="350" height="20" />
      </ContentLoader>
      <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
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
