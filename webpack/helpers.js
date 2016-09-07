/* eslint no-restricted-syntax:0 */
/* eslint no-prototype-builtins:0 */

module.exports = {
  parseDotenvConfig(config) {
    const define = {};
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        define[key] = JSON.stringify(config[key]);
      }
    }
    return define;
  }
};
