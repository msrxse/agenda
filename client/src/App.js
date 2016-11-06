import React, { Component } from 'react';
import './App.css';
import ContactsScreen from './containers/ContactsScreen';
import Footer from './components/Footer';

const App = ({ children }) => {
  return (
    <div className="App">
      {children}
      <Footer />
    </div>
  );
};

export default App;
