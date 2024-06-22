import { createPortal } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { MD5 } from 'object-hash';

import {
  apiActions,
  appActions,
  mapActions,
  markerActions,
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

import { isTimerType, TimerLoader, type TimerElement } from '@repo/timer';

type EmbedElement = IngameMapElement | IngameUiElement | TimerElement;
type EmbedLoader =
  | typeof IngameMapLoader
  | typeof IngameUiLoader
  | typeof TimerLoader
  | undefined;
type EmbedActions = IngameMapActions | undefined;
type EmbedHooks = IngameMapHooks | undefined;

export function ElementLoader() {
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
  // const dispatch = useAppDispatch();
  // const { mapsLoaded } = useAppSelector((state) => state.app);
  const { element, idx } = props;
  element.classList.remove('gw2MultiEmb');
  const { dataset } = element;
  const { gw2Embed: embedType } = dataset;

  // const { setMapsLoaded } = appActions;

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
  } else if (isTimerType(embedType)) {
    ElementLoader = TimerLoader;
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
