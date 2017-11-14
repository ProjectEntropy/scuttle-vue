
<template>
  <div class="media">
    <img :src="profile_image">
  </img>

    <div class="media-body">
      <h5 class="mt-0">{{ author }}</h5>

      <span v-html="content_text()"></span>


      <p>
        {{ message.value.content.type() }}
      </p>
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
  subscriptions: function () {
    // var obj = {
    // debugger

    // profile_image: Rx.Observable.bindCallback( this.api.avatar_image[0].bind(this) )('@ywmhh72dezK+GrK+/QiYOJ0dKWVuGA/AkpOB/wrWTgk=.ed25519')
    // }
    // // debugger
    //
    // return obj
  },
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
    }
  },
  updated() {
    // author name
    this.$depject_api.signifier[0](
      this.message.value.author(), this.setAuthor
    )


  }
}

</script>

<style scoped>
</style>
