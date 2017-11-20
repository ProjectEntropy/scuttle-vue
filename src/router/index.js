import Vue from 'vue'
import Router from 'vue-router'
import Public from './../components/Public.vue'
import Hot from './../components/Hot.vue'
import Profile from './../components/Profile.vue'
import Invite from './../components/Invite.vue'
import Settings from './../components/Settings.vue'
import Infinitely from './../components/Infinitely.vue'
import BlobMessage from './../components/BlobMessage.vue'
import Feed from './../components/Feed.vue'
import SingleMessage from './../components/SingleMessage.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
    // view ssb links directly from the url
    {
      path: '/view/:id([%]25.+)', // sigil fixed to be %25 = messages
      component: SingleMessage
    },
    {
      path: '/view/:id([&].+)', // sigil = & = blobs
      component: BlobMessage
    },
    {
      path: '/view/:id([@].+)', // sigil = @ = feeds
      component: Feed
    },

    // ssb messages with the % sigil are non-valid uri's 
    // % is an escape character used with digits to encode characters not normally allowed in a uri. such as %20 = [space]
    // therefore to be a valid uri; the message sigil should be %25 (%25 = the percentage symbol)
    // sadly redirecting with the path corrected in this file doesn't work in vue router because it encodes the uri with 
    // encodeURIComponent before I can get a hook on it
    // see line 12 of vue-router/src/utils/query.js 
    // we can modify the code here  -  not that keen on monkey patching vue-router though!
    // see the discussion here around a similar but opposite issue with commas in the url
    // https://github.com/vuejs/vue-router/pull/1047
    { // /^%[A-Za-z0-9\/+]{43}=\.sha256$/ // finds an ssb valid message hash
      path: '/view/:id([%][^2].+)', // sigil not starting %2 i.e. malformed uri todo make it look for % AND NOT 25
      // component: SingleMessage,
      // redirect: to => {
      //   console.log('malformed uri here')
      //   console.log('redirect.to', to)
      //   // the function receives the target route as the argument
      //   // return redirect path/location here.
      //   // if(to.path.includes('%25')) return { path: to.path, component: View}
      //   function fixPercentSigil(link) {
      //     return link.replace(/%/g, '%25')
      //   }
      //   let fixedLink = fixPercentSigil(to.path)
      //   return { path: fixedLink, component: SingleMessage }
      // }
    },

    // regex not working?
    {
      path: 'invite/:invite(invite/\(.*\))',
      name: 'invite_show',
      component: Invite
    }
  ]
})
