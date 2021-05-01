import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import WeatherContainer from './Containers/WeatherContainer';

ReactDOM.render(
  <Router>
    <App>
      <Route exact path='/' component={WeatherContainer} />
    </App>
  </Router>
  ,document.getElementById('root')
);


