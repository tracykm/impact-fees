import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BasicTable} from './components/Table';

const App: React.FC = () => {
  return (
    <div className="App">
      <BasicTable />
    </div>
  );
};

export default App;
