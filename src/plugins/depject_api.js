var DepjectAPI = {};
const nest = require('depnest')
const depject = require('depject')
const memo = require('asyncmemo')

const patchcore = require('patchcore').patchcore
DepjectAPI.install = function(Vue, options){
  var depject_api = depject(
    require('./../../modules')
  )

  Vue.prototype.$dethrashed_signifier = memo(depject_api.signifier[0])
  Vue.prototype.$depject_api = depject_api;
};

export default DepjectAPI;
