const rewireMobX = require('react-app-rewire-mobx');
const rewireTypescript = require('react-app-rewire-typescript');

const { compose } = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
 // config = rewireMobX(config, env);
 // config = rewireTypescript(config, env);

  const rewires =  compose(rewireTypescript, rewireMobX);

  return rewires(config, env);
}