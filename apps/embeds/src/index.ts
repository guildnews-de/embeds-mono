const init = async () => {
  let rootElement = document.getElementById('gw2embeds_root');

  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'gw2embeds_root');
    rootElement.setAttribute('data-gw2emb-version', '0.5.0-dev');

    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.append(rootElement);
    } else {
      throw new Error('[gw2embeds] body element not found!');
    }

    try {
      const App = (await import('./App')).default;
      App();
    } catch (err) {
      throw new Error('[gw2embeds] Failed to load main-script', { cause: err });
    }

    // .then(({ default: App }) => App())
    // .catch((err) => {
    //   console.error(err);
    // });
  } else {
    console.warn(
      'The GW2MultiEmb script ran a second time. That should not happen!',
    );
  }
};

export default (function setGW2Embed() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init().catch(console.error);
    });
  } else {
    setTimeout(init, 1);
  }
})();
