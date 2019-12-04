import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BasicTable } from './components/Table'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BasicTable/>
      </header>
    </div>
  );
}

export default App;
