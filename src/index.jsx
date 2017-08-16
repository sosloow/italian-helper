import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "mobx-react";
import {AppContainer} from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppState from './stores/AppState';
import App from './components/App';

const appState = new AppState();

injectTapEventPlugin();

render(
  <AppContainer>
    <Router>
      <MuiThemeProvider>
        <Provider store={appState}>
          <App />
        </Provider>
      </MuiThemeProvider>
    </Router>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    render(
      <AppContainer>
        <Provider store={appState}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
