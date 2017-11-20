var SlowGetter = {};

SlowGetter.install = function(Vue, options){
  var getters = {
    get(f, args){
      return
    }
  }

  Vue.prototype.$get = getters;
};

export default SlowGetter;
