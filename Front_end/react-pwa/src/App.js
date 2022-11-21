import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import './App.css';
import {HeaderResponsive} from './Components/Helpers/Header/Header';

function App() {
  return (
    <div className="App">
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider>
          <HeaderResponsive/>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
