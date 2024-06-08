import { StrictMode as ReactStrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import {
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
import { MD5 } from 'object-hash';

type EmbedElement = IngameMapElement | IngameUiElement;
type EmbedLoader = typeof IngameMapLoader | typeof IngameUiLoader | undefined;
type EmbedActions = IngameMapActions | undefined;
type EmbedHooks = IngameMapHooks | undefined;

export default function App() {
  console.log('App not ready yet ^_^');

  const targets: EmbedElement[] = Array.from(
    document.querySelectorAll('.gw2MultiEmb'),
  );

  targets.forEach((element, idx) => {
    element.classList.remove('gw2MultiEmb');
    const { dataset } = element;
    const { gw2Embed: embedType } = dataset;

    let ElementLoader: EmbedLoader;
    let ElementHooks: EmbedHooks;
    let ElementActions: EmbedActions;

    if (isIngameMapType(embedType)) {
      const { setDragged, setDragView, setRecenter, setMarkView } = mapActions;
      const { setClicked, pushMarker, setMarker } = markerActions;
      const { openCanvas } = appActions;
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
      };
    } else if (isIngameUiType(embedType)) {
      ElementLoader = IngameUiLoader;
    }

    if (ElementLoader) {
      const root = createRoot(element);
      const hash = MD5({ ...dataset, idx });

      root.render(
        <ReactStrictMode>
          <Provider store={store}>
            <ElementLoader
              data={dataset}
              hooks={ElementHooks!}
              actions={ElementActions!}
              hash={hash}
            />
          </Provider>
        </ReactStrictMode>,
      );
    }
  });
}
