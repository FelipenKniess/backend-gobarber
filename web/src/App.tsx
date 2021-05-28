import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';
import AppProvider from '../src/hooks';

const App:React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  </Router>
)

export default App;
