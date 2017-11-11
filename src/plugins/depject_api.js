var DepjectAPI = {};
const nest = require('depnest')
const depject = require('depject')

const patchcore = require('patchcore').patchcore
DepjectAPI.install = function(Vue, options){
  var depject_api = depject(
    require('./../../modules')
  )

  Vue.prototype.$depject_api = depject_api;
};

export default DepjectAPI;
