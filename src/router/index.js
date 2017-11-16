import Vue from 'vue'
import Router from 'vue-router'
import Public from './../components/Public.vue'
import Profile from './../components/Profile.vue'
import Invite from './../components/Invite.vue'
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
      path: '/view/:hash',
      name: 'show',
      component: Public
    },
    {
      path: 'invite/:invite(invite/\(.*\))',
      name: 'invite_show',
      component: Invite
    }
    // ,
    // {
    //   path: '/invite/:part_1/:part_2',
    //   name: 'invite_show',
    //   component: Invite
    // },
    // {
    //   path: '/invite/:part_1/:part_2/:part_3',
    //   name: 'invite_show',
    //   component: Invite
    // },
    // {
    //   path: '/invite/:part_1/:part_2/:part_3/:part_4',
    //   name: 'invite_show',
    //   component: Invite
    // }
  ]
})
