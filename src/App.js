import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Route path="/Trybe-Wallet/carteira" component={ Wallet } />
      <Route exact path="/Trybe-Wallet" component={ Login } />
    </div>
  );
}

export default App;
