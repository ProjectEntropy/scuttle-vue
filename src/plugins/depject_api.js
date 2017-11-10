var DepjectAPI = {};

DepjectAPI.install = function(Vue, options){
  var depject_api = require('depject')(
    require('./../../modules')
  )

  Vue.prototype.$depject_api = depject_api;
};

export default DepjectAPI;
