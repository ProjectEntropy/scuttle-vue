import Vue from 'vue'
import Router from 'vue-router'
import Public from './../components/Public.vue'
import Infinitely from './../components/Infinitely.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Public
    },
    {
      path: '/public',
      name: 'public',
      component: Public,
      props: true
    },
    {
      path: '/infinitely',
      name: 'infinitely',
      component: Infinitely
    }
  ]
})
