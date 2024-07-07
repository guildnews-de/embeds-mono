import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import { BaseUI } from './components/BaseUI';
import { ElementLoader } from './components/ElementLoader';

import { store } from '@repo/app-redux';

export default function App() {
  const rootElement = document.getElementById('gw2embeds_root');
  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <BaseUI />
          <ErrorBoundary fallback={<div>{`Error in Root Node O_o`}</div>}>
            <ElementLoader />
          </ErrorBoundary>
        </Provider>
      </React.StrictMode>,
    );
  }
}
