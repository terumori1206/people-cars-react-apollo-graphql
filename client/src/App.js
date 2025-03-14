import './App.css';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './apollo';
import Home from './pages/Home';
import ShowPage from './pages/ShowPage';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people/:id" element={<ShowPage />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
