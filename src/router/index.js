import Vue from 'vue'
import Router from 'vue-router'
import Public from './../components/Public.vue'
import Hot from './../components/Hot.vue'
import Profile from './../components/Profile.vue'
import Invite from './../components/Invite.vue'
import Settings from './../components/Settings.vue'
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
      path: '/HOT',
      name: 'hot',
      component: Hot
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    // View something: Person, Post, Blob
    {
      path: '/view/:hash',
      name: 'show',
      component: Public
    },
    {
      path: 'invite/:invite(invite/\(.*\))',
      name: 'invite_show',
      component: Invite
    }
  ]
})
