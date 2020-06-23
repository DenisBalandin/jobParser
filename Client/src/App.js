import React from 'react';
import logo from './logo.svg';
import Indeed from './components/Indeed';
import Home from './components/Home';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <div id="menu">
            <Link to={`/`}>Home</Link>
            <Link to={`/indeed`}>Indeed</Link>

          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/indeed" component={Indeed} />
      
        </Router>
       
      {/* <Indeed/> */}
    </div>
  );
}

export default App;
