import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@internal/core';
import { ThemeProvider } from '@mui/material';

import { AppLoader } from './components/AppLoader';
import { embedTheme } from './shared/theme';

function App() {
  const rootElement = document.getElementById('gw2embeds_root');

  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <ReduxProvider store={store}>
          <ThemeProvider theme={embedTheme}>
            <AppLoader />
          </ThemeProvider>
        </ReduxProvider>
      </StrictMode>,
    );
  }
}

export default () => App();
