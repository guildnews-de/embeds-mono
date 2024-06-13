// import { version as packVersion } from '../package.json';

declare global {
  interface Window {
    gw2MultiEmb?: { version: string };
  }
}

const init = () => {
  const { gw2MultiEmb } = window;
  // const scripts = document.querySelector('script#gw2embeds');
  if (!gw2MultiEmb) {
    window.gw2MultiEmb = { version: process.env.VERSION! };
    import('./App')
      .then(({ default: App }) => App())
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log(
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
