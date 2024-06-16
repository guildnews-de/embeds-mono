import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { MD5 } from 'object-hash';
import { CssBaseline } from '@repo/core';

import { AppDrawer } from '@repo/core';

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
  MapCont,
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
          <AppBaseUI />
          <ErrorBoundary fallback={<div>{`Error in Root Node O_o`}</div>}>
            <ElementLoader />
          </ErrorBoundary>
        </Provider>
      </React.StrictMode>,
    );
  }
}

function AppBaseUI() {
  // const dispatch = useAppDispatch();
  const { mapsLoaded } = useAppSelector((state) => state.app);
  const { setDragged, setDragView, setRecenter, setMarkView } = mapActions;
  const { setClicked } = markerActions;

  const mapPropActions = {
    setDragged,
    setDragView,
    setRecenter,
    setMarkView,
    setClicked,
  };

  const mapPropHooks = {
    useAppSelector,
    useAppDispatch,
  };

  return (
    <>
      <CssBaseline />
      <AppDrawer>
        {mapsLoaded && (
          <MapCont
            actions={mapPropActions}
            hooks={mapPropHooks}
            hash={'hash'}
          />
        )}
      </AppDrawer>
    </>
  );
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
  const dispatch = useAppDispatch();
  const { mapsLoaded } = useAppSelector((state) => state.app);
  const { element, idx } = props;
  element.classList.remove('gw2MultiEmb');
  const { dataset } = element;
  const { gw2Embed: embedType } = dataset;

  const { setMapsLoaded } = appActions;

  let ElementLoader: EmbedLoader;
  let ElementHooks: EmbedHooks;
  let ElementActions: EmbedActions;

  if (isIngameMapType(embedType)) {
    const { setDragged, setDragView, setRecenter, setMarkView, addActiveMap } =
      mapActions;
    const { setClicked, pushMarker, setMarker } = markerActions;
    const { openCanvas } = appActions;
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
    };
  } else if (isIngameUiType(embedType)) {
    ElementLoader = IngameUiLoader;
  }

  useMemo(() => {
    if (!mapsLoaded && isIngameMapType(embedType)) {
      dispatch(setMapsLoaded());
    }
  }, [embedType, dispatch, setMapsLoaded, mapsLoaded]);

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
