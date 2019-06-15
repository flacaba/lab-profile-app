import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './components/Home';
import Register from './components/Register';



function App() {
  return (
    <div className="App">
      <Register />
      <Switch>
        <Route exact path='/'component={HomePage}/>
        <Route exact path='/login'/>
        <Route exact path='/register'/>
      </Switch>
    </div>
  );
}

export default App;
