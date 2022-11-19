import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

/** @type {import('rollup').RollupOptions} */
const generic = {
  external: ['solid-js', 'solid-js/web'],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    babel({
      extensions: ['.js', '.ts', '.tsx'],
      babelHelpers: 'bundled',
      presets: ['solid', '@babel/preset-typescript'],
      exclude: 'node_modules/**'
    })
  ]
}

/** @type {import('rollup').RollupOptions} */
const config = pkg.workspaces.map((workspace) => ({
  input: `${workspace}/index.ts`,
  output: {
    dir: `dist/${workspace.replace('packages/', '')}`,
    format: 'es'
  },
  ...generic
}))

export default config
