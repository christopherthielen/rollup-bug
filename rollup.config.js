import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

function isExternal(id) {
  let externals = [
    /^ui-router-(core|rx)/,
  ];
  return externals.map(regex => regex.exec(id)).reduce((acc, val) => acc || !!val, false);
}

const CONFIG = {
  moduleName: 'rollup-bug',
  entry: 'index.js',
  dest: '_bundles/rollup-bug.js',

  sourceMap: true,
  format: 'umd',
  exports: 'named',
  plugins: [ commonjs(), nodeResolve({ jsnext: true }) ],

  external: isExternal,

  globals: {
    'ui-router-core': 'ui-router-core',
  }
};

export default CONFIG;
