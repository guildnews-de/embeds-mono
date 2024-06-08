import { version as packVersion } from '../package.json';

declare global {
  interface Window {
    gw2embScript?: { version: string };
  }
}

const init = () => {
  const { gw2embScript } = window;
  // const scripts = document.querySelector('script#gw2embeds');
  if (!gw2embScript) {
    window.gw2embScript = { version: packVersion };
    import('./App')
      .then(({ default: App }) => App())
      .catch((err) => {
        console.error(err);
      });
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
