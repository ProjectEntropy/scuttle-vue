
<template>
  <div class="media">
    {{ profile_image }}

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
      api: this.$depject_api
    }
  },
  subscriptions: function () {
    return {
      profile_image: this.$observers.cb_obs(
        this.api.avatar_image[0]
      )(this.message.value.content.author(), 'tiny', this)
    }
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
