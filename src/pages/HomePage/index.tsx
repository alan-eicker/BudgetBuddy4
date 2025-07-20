import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Budget Buddy | Dashboard</title>
      </Helmet>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </>
  );
};

export default HomePage;
