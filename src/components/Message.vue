
<template>
  <div class="media">
    <img class="mr-3 w-25" :src="profile_image"> <!-- alt="Generic placeholder image" -->
    <div class="media-body">
      <h5 class="mt-0">{{ author }}</h5>
      <p>{{ message.value.content.type() }}</p>
      <div v-html="content_text()"></div>
    </div>
  </div>
</template>

<script>

// var pull = require('pull-stream')
import Rx from 'rxjs/RX'
import { Observable } from 'rxjs/Observable'
const nn = require('nevernull')
const md = require('ssb-markdown')

export default {
  name: 'message',
  props: ['message'],
  data () {
    return {
      author: "...",
      image_url: "http://via.placeholder.com/90x90",
      api: this.$depject_api,

    }
  },
  // subscriptions: function () {
  //   return {
  //     messages: this.$observers.accumulated_observable(
  //       this.$depject_api.sbot_log[0]( { limit: 10, reverse: true, live: true } )
  //     )
  //   }
  // },
  // subscriptions: function () {
  //   // var obj = {
  //   // debugger

  //   // profile_image: Rx.Observable.bindCallback( this.api.avatar_image[0].bind(this) )('@ywmhh72dezK+GrK+/QiYOJ0dKWVuGA/AkpOB/wrWTgk=.ed25519')
  //   // }
  //   // // debugger
  //   //
  //   // return obj
  // },
  computed: {
    profile_image: function(){
      return vm.$depject_api.blob_url[0]("&aIbhv+YRJ85BAWzI1oCwa9716L5pdvMliMdh4KOT+SE=.sha256") }
  },
  methods: {
    setAuthor(err, a){
      if(a[0] == null)
        return
      this.author = nn( a[0] ).name()
    },
    // Get markdown formatted version of message content
    content_text()
    {
      return md.block( this.message.value.content.text() )
    },
    cb(shit){
      console.log(shit)
    }
  },
  updated() {
    // author name
    this.$depject_api.signifier[0](
      this.message.value.author(), this.setAuthor
    )


  },
  mounted() {
    
    this.$depject_api.signifier[0](
      this.message.value.author(), this.cb
    )
    window.message = this.message
    console.log('this.message.value', this.message.value)
  }
}

</script>

<style scoped>
</style>
