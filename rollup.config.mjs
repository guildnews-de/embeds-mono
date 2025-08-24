// import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
import swc from '@rollup/plugin-swc';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

const pathSrcEmbeds = 'apps/embeds';
const pathOutEmbeds = 'dist/embeds';

const nodeEnv =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: `${pathSrcEmbeds}/src/index.ts`,
  output: {
    dir: pathOutEmbeds,
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    del({
      targets: ['dist/embeds/*'],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] }),
    commonjs(),
    scss({ sourceMap: true }),
    swc({
      swc: {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: {
            react: { runtime: 'automatic' },
          },
        },
      },
    }),
    postcss(),
    url({
      limit: 0,
      // include: ['**/*.png'],
      destDir: `${pathOutEmbeds}/assets`,
    }),
    copy({
      targets: [{ src: `${pathSrcEmbeds}/public/*`, dest: pathOutEmbeds }],
    }),
  ],
};

export default config;
