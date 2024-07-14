import { createPortal } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { MD5 } from 'object-hash';

import {
  isIngameMapType,
  IngameMapLoader,
  type IngameMapElement,
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

export function ElementLoader() {
  const targets: EmbedElement[] = Array.from(
    document.querySelectorAll('.gw2MultiEmb'),
  );

  return targets.map((element, idx) => (
    <ElementPortal element={element} key={MD5(`GW2_Emebds_${idx}`)} idx={idx} />
  ));
}

function ElementPortal(props: { element: EmbedElement; idx: number }) {
  const { element, idx } = props;
  element.classList.remove('gw2MultiEmb');
  const { dataset } = element;
  const { gw2Embed: embedType } = dataset;

  let ElementLoader: EmbedLoader;

  if (isIngameMapType(embedType)) {
    ElementLoader = IngameMapLoader;
  } else if (isIngameUiType(embedType)) {
    ElementLoader = IngameUiLoader;
  } else if (isTimerType(embedType)) {
    ElementLoader = TimerLoader;
  } else {
    console.error(`Unrecognized embed type ${embedType}`);
  }

  if (ElementLoader) {
    const hash = MD5({ ...dataset, idx });

    return createPortal(
      <ErrorBoundary
        fallback={<div>{`Element Error in Type '${embedType}'`}</div>}
      >
        <ElementLoader data={dataset} hash={hash} />
      </ErrorBoundary>,
      element,
      hash,
    );
  }
}
