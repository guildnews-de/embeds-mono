import { useId } from 'react';
import { createPortal } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';

import {
  isIngameMapType,
  IngameMapLoader,
  type IngameMapElement,
} from '@internal/ingame-map';

import {
  isIngameUiType,
  IngameUiLoader,
  type IngameUiElement,
} from '@internal/ingame-ui';

import { isTimerType, TimerLoader, type TimerElement } from '@internal/timer';

type EmbedElement = IngameMapElement | IngameUiElement | TimerElement;
type EmbedLoader =
  | typeof IngameMapLoader
  | typeof IngameUiLoader
  | typeof TimerLoader
  | undefined;

export function EmbeddingsLoader() {
  const key = useId();
  const targets: EmbedElement[] = Array.from(
    document.querySelectorAll('.gw2MultiEmb'),
  );

  return targets.map((element, idx) => (
    <ElementPortal
      element={element}
      key={['Gw2Embeds', key, idx].toString()}
      idx={idx}
    />
  ));
}

function ElementPortal(props: { element: EmbedElement; idx: number }) {
  const key = useId();
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
    const hash = [embedType, key, idx].toString();

    return createPortal(
      <ErrorBoundary
        // fallback={<div>{`Element Error in Type '${embedType}'`}</div>}
        // onError={console.error}
        fallbackRender={({ error }) => {
          const finalError =
            error instanceof Error
              ? error
              : new Error('Failed to load embed component', {
                  cause: error,
                });
          return (
            <div>
              <p>Failed to load embed component</p>
              <pre style={{ backgroundColor: 'lightyellow' }}>
                {JSON.stringify({ hash, dataset }, null)}
              </pre>
              <pre style={{ backgroundColor: 'lightcoral' }}>
                {finalError.message}
              </pre>
            </div>
          );
        }}
      >
        <ElementLoader data={dataset} hash={hash} />
      </ErrorBoundary>,
      element,
      hash,
    );
  }
}
