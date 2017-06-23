import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: [
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.dependencies)
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'react-focustrap-hoc',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ],
};