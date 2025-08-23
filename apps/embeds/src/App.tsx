import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import { BaseUI } from './components/BaseUI';
import { EmbeddingsLoader } from './components/EmbeddingsLoader';

import { store } from '@internal/core';
import { embedTheme } from './shared/theme';
import { ThemeProvider } from '@mui/material';

function App() {
  const rootElement = document.getElementById('gw2embeds_root');
  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={embedTheme}>
            <BaseUI />
            <ErrorBoundary fallback={<div>{`Error in Root Node O_o`}</div>}>
              <EmbeddingsLoader />
            </ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </StrictMode>,
    );
  }
}

export default () => App();
