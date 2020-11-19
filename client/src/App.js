import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {JoinToChat, ChatInterface} from './components';

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={JoinToChat}/>
      <Route path='/chat' component={ChatInterface}/>
    </Router>
  )
}

export default App;
