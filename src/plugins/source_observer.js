var SourceObserver = {}
var pull = require('pull-stream')
// var Sort = require('pull-sort')

import Rx from 'rxjs/RX'
import { Observable } from 'rxjs/Observable'

// safe nul checking thing
const nn = require('nevernull')


SourceObserver.install = function(Vue, options) {
  var observers = {
    accumulated_observable(source){
      return Rx.Observable.create(function (observer) {
        pull(
          source,
          pull.drain(msg => observer.next(msg))
        )
      }).scan((accumulator, newMsg) => {
        return [nn(newMsg), ...accumulator]
      }, [])
    },

    // Given a collection, drain a pullstream into it
    pull_into(collection, source) {
      pull(
        source,
        pull.drain( function(msg) {
          if(msg.sync)
            return
          collection.push(nn(msg))
        })
      )
    },

    cb_obs(f, args) {
      return Rx.Observable.bindCallback(f)(args)
    }
  }

  Vue.prototype.$observers = observers
}

export default SourceObserver
