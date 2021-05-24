import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';



import AppProvider from '../src/hooks';

const App:React.FC = () => (
  <>
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  </>
)

export default App;
