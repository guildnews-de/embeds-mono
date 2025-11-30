// import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
// import scss from 'rollup-plugin-scss';
import styles from 'rollup-plugin-styler';
import swc from '@rollup/plugin-swc';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { visualizer } from 'rollup-plugin-visualizer';

import type { RollupOptions } from 'rollup';

const pathSrcEmbeds = 'apps/embeds';
const pathOutEmbeds = 'dist/embeds';

const nodeEnv =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config: RollupOptions = {
  input: `${pathSrcEmbeds}/src/index.ts`,
  output: {
    dir: pathOutEmbeds,
    format: 'esm',
    sourcemap: true,
    assetFileNames: (assetInfo) => {
      return assetInfo.names.reduce<string>((result, name) => {
        return name.startsWith('index') && name.endsWith('.css')
          ? 'assets/[name][extname]'
          : result;
      }, 'assets/[name]-[hash][extname]');
    },
  },
  plugins: [
    del({
      targets: ['dist/embeds/*'],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      dedupe: ['react', 'react-dom'],
    }),
    commonjs({ sourceMap: true }),
    // scss({
    //   sourceMap: true,
    //   fileName: 'index.css',
    //   processor: () => new postcss(),
    // }),
    styles({
      // mode: ['extract', 'index.css'],
      dts: true,
      sourceMap: true,
      autoModules: true,
      extensions: ['.css', '.pcss', '.postcss', '.sss', '.scss'],
    }),
    image(),
    swc({
      swc: {
        sourceMaps: true,
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: {
            react: { runtime: 'automatic' },
          },
        },
      },
    }),
    // postcss(),
    url({
      limit: 0,
      // include: ['**/*.png'],
      destDir: `${pathOutEmbeds}/assets`,
    }),
    copy({
      targets: [{ src: `${pathSrcEmbeds}/public/*`, dest: pathOutEmbeds }],
    }),
    visualizer({ emitFile: true, filename: 'stats.html' }),
  ],
};

export default config;
