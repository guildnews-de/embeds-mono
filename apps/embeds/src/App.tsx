import React from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { MD5 } from 'object-hash';

import { AppDrawer } from '@repo/app-panel';

import {
  apiActions,
  appActions,
  mapActions,
  markerActions,
  store,
  useAppDispatch,
  useAppSelector,
} from '@repo/app-redux';

import {
  isIngameMapType,
  IngameMapLoader,
  type IngameMapElement,
  type IngameMapActions,
  type IngameMapHooks,
} from '@repo/ingame-map';

import {
  isIngameUiType,
  IngameUiLoader,
  type IngameUiElement,
} from '@repo/ingame-ui';

type EmbedElement = IngameMapElement | IngameUiElement;
type EmbedLoader = typeof IngameMapLoader | typeof IngameUiLoader | undefined;
type EmbedActions = IngameMapActions | undefined;
type EmbedHooks = IngameMapHooks | undefined;

export default function App() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <AppDrawer />
          <ErrorBoundary
            fallback={<div>{`Element Error in Root Node O_o`}</div>}
          >
            <ElementLoader />
          </ErrorBoundary>
        </Provider>
      </React.StrictMode>,
    );
  }
}

function ElementLoader() {
  const targets: EmbedElement[] = Array.from(
    document.querySelectorAll('.gw2MultiEmb'),
  );

  const Portals = () =>
    targets.map((element, idx) => (
      <ElementPortal
        element={element}
        key={MD5(`GW2_Emebds_${idx}`)}
        idx={idx}
      />
    ));
  return Portals();
}

function ElementPortal(props: { element: EmbedElement; idx: number }) {
  const { element, idx } = props;
  element.classList.remove('gw2MultiEmb');
  const { dataset } = element;
  const { gw2Embed: embedType } = dataset;

  let ElementLoader: EmbedLoader;
  let ElementHooks: EmbedHooks;
  let ElementActions: EmbedActions;

  if (isIngameMapType(embedType)) {
    const { setDragged, setDragView, setRecenter, setMarkView, addActiveMap } =
      mapActions;
    const { setClicked, pushMarker, setMarker } = markerActions;
    const { openCanvas /* , setMapsLoaded, activateLL */ } = appActions;
    const { fetchMap } = apiActions;

    ElementLoader = IngameMapLoader;
    ElementHooks = {
      useAppDispatch,
      useAppSelector,
    };
    ElementActions = {
      setDragged,
      setDragView,
      setRecenter,
      setMarkView,
      setClicked,
      pushMarker,
      setMarker,
      openCanvas,
      addActiveMap,
      fetchMap,
      // setMapsLoaded,
      // activateLL,
    };
  } else if (isIngameUiType(embedType)) {
    ElementLoader = IngameUiLoader;
  }

  if (ElementLoader) {
    const hash = MD5({ ...dataset, idx });

    return createPortal(
      <ErrorBoundary
        fallback={<div>{`Element Error in Type '${embedType}'`}</div>}
      >
        <ElementLoader
          data={dataset}
          hooks={ElementHooks!}
          actions={ElementActions!}
          hash={hash}
        />
      </ErrorBoundary>,
      element,
      hash,
    );
  }
}
