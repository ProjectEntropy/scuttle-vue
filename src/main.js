// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import Public from './components/Public.vue'

// Vue extensions
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-GB',
  locales: {
    'en-GB': require('vue-timeago/locales/en-GB.json')
  }
})
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// Routing
import router from './router'

console.log('router', router)

// router.beforeRouteLeave((to, from, next) => {
//   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//   if (answer) {
//     next()
//   } else {
//     next(false)
//   }
// })

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach this', this)
  console.log('router.beforeEach((to)', to)
  console.log('router.beforeEach((from)', from)
  console.log('router.beforeEach((next)', next)

  // var path = to.path
  // if(to.path.substring(0, 6) === '/view/') {
  //   console.log(to.path.substring(0, 6))
  // }
  // to.path = '/view'
  // var re = new RegExp('\/view\/((([%&@]|%25)(?:[A-Za-z0-9\/+]|%2[Ff]|%2[Bb]){43}(?:=|%3D)\.(?:sha256|ed25519))(?:\.([^?]*))?|(\/.*?))(?:\?(.*))?')
  // var match = re.match(to.path)
  // console.log('match', match)

  // router.push({ path: `/viewer`, fullPath: `/viewer` })
  // var id = 'anid'
  // router.replace({ name: 'viewer' })
  // router.replace({ path: `/public/${id}` })
  // debugger



  next()
  // ...
})

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

// Observable adapters for pull-streams etc
import SourceObserver from './plugins/source_observer'
Vue.use(SourceObserver)

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('YYYY/MM/DD hh:mm')
  }
})

var vm = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
window.vm = vm
