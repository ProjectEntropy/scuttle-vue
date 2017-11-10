// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import Public from './components/Public.vue'
import Hello from './components/Hello.vue'

// Routing
import router from './router'

// Observable stuff
import Rx from 'rxjs/RX'
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription' // Disposable if using RxJS4
Vue.use(VueRx, {
  Observable,
  Subscription
})

// Depject API
import DepjectAPI from './plugins/depject_api'
Vue.use(DepjectAPI)

// Pull source observable
import SourceObserver from './plugins/source_observer'
Vue.use(SourceObserver)


// .app[0]()
// console.log("depject_api", depject_api)
// window.depject_api = depject_api

// SSB
// var pull = require('pull-stream')
// var ssbKeys = require('ssb-keys')
// var ref = require('ssb-ref')
// var Reconnect = require('pull-reconnect')
// var path = require('path')
// var config = require('ssb-config/inject')(process.env.ssb_appname)
// config.keys = ssbKeys.loadOrCreateSync(path.join(config.path, 'secret'))
//
// var createClient = require('ssb-client')
// var createConfig = require('ssb-config/inject')
// var createFeed   = require('ssb-feed')
// var keys = require('../keys')
// var ssbKeys = require('ssb-keys')
// var pull = require('pull-stream')
//
// var CACHE = {}
// var cache = CACHE
//
// var client = require('ssb-client')

// client(keys, {
//   manifest: require('../manifest.json'),
//   remote: require('../config')().remote,
//   caps: config.caps
// }, function (err, _sbot) {
//   if(err) {
//     console.log(err)
//
//     return
//   }
//
//   window.sbot = _sbot
//
//   sbot.on('closed', function (e) {
//     // sbot = null
//     console.log("closed sbot")
//     console.log(e)
//   })


  new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    components: { App, Hello },
    template: '<App/>'
  })
// })



// })
