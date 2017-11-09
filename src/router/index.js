import Vue from 'vue'
import Router from 'vue-router'
import Hello from './../components/Hello.vue'
import Public from './../components/Public.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Hello
    },
    {
      path: '/public',
      name: 'public',
      component: Public,
      props: true
    },
  ]
})
