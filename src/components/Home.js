// src/Home.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const goToUsers = () => {
    history.push('/users');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToUsers}>Go to Users</button>
    </div>
  );
};

export default Home;
