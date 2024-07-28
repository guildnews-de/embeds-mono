import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import { BaseUI } from './components/BaseUI';
import { EmbeddingsLoader } from './components/EmbeddingsLoader';

import { store } from '@repo/app-redux';
import { embedTheme } from './shared/theme';
import { ThemeProvider } from '@mui/material';

export default function App() {
  const rootElement = document.getElementById('gw2embeds_root');
  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={embedTheme}>
            <BaseUI />
            <ErrorBoundary fallback={<div>{`Error in Root Node O_o`}</div>}>
              <EmbeddingsLoader />
            </ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>,
    );
  }
}
