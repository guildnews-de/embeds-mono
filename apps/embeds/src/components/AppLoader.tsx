import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// import { EmbeddingsLoader } from './EmbeddingsLoader';
import { ElementPortal } from './ElementPortal';
import { BaseUI } from './BaseUI';
import type { EmbedElement } from './ElementPortal';

export function AppLoader() {
  const key = useId();

  const targets = document.querySelectorAll<EmbedElement>('.gw2MultiEmb');

  return (
    <>
      <BaseUI />
      {[...targets].map((element, idx) => (
        <ErrorBoundary
          key={['Gw2Embeds', key, idx].toString()}
          fallback={<div>{`Error in Root Node O_o`}</div>}
        >
          <ElementPortal element={element} idx={idx} />
        </ErrorBoundary>
      ))}
    </>
  );
}
