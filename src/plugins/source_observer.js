var SourceObserver = {};
var pull = require('pull-stream')
import Rx from 'rxjs/RX'
import { Observable } from 'rxjs/Observable'

// safe nul checking thing
const nn = require('nevernull');


SourceObserver.install = function(Vue, options){
  var observers = {
    accumulated_observable(source){
      return Rx.Observable.create(function (observer) {
        pull(
          source,
          pull.drain(msg => observer.next(msg))
        )
      }).scan((accumulator, newMsg) => [nn(newMsg), ...accumulator], [])
    },
    cb_obs(f, args){
      return Rx.Observable.bindCallback(f)(args)
    }
  }

  Vue.prototype.$observers = observers;
};

export default SourceObserver;
