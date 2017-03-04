# rollup-bug
Rollup exports symbol from wrong module


When exporting * from a node module, then exporting * from a local module, the local module is exported incorrectly when built as an AMD bundle.

ES6 input:
```js
export * from "ui-router-core";
export * from "./localmodule";
```

UMD output (incorrect):
```js
Object.keys(uiRouterCore).forEach(function (key) { exports[key] = uiRouterCore[key]; });
exports.FOO = uiRouterCore.FOO;

Object.defineProperty(exports, '__esModule', { value: true });
```

Incorrectly exports FOO as `uiRouterCore.FOO`

---

ES6 input (order of exports swapped):
```js
export * from "./localmodule";
export * from "ui-router-core";
```

UMD output (OK):
```
const FOO = "foo";

exports.FOO = FOO;
Object.keys(uiRouterCore).forEach(function (key) { exports[key] = uiRouterCore[key]; });

Object.defineProperty(exports, '__esModule', { value: true });
```
