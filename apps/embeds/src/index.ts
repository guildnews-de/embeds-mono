// import { version as packVersion } from '../package.json';

declare global {
  interface Window {
    gw2MultiEmb?: { version: string };
  }
}

const init = () => {
  let rootElement = document.getElementById('gw2embeds_root');

  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'gw2embeds_root');
    rootElement.setAttribute('data-gw2emb-version', process.env.VERSION!);

    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.append(rootElement);
    } else {
      throw new Error('[gw2embeds] body element not found!');
    }

    import('./App')
      .then(({ default: App }) => App())
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.warn(
      'The GW2MultiEmb script ran a second time. That should not happen!',
    );
  }
};

export default (function setGW2Embed() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
    });
  } else {
    setTimeout(init, 1);
  }
})();
