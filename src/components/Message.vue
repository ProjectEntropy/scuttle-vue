
<template>
  <div class="media">
    <img class="mr-3 rounded " style="max-width: 60px; " :src="image_url">
    <div class="media-body col-sm-9">
      <h5 class="mt-0 text-truncate">{{ author }}</h5>

      <span v-if="" class="text-truncate" v-html="content_text()"></span>

      <p>
        {{ message.value.content.type() }}
      </p>
    </div>
    <hr/>
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
      relatedMessages: {}
    }
  },

  methods: {
    setAuthor(err, a){
      if(a[0] == null)
        return
      this.author = nn( a[0] ).name()
    },

    setRelatedMessages(err, a){
      // debugger
      if(err) {
        console.log('message.vue.setRelatedMessages.err', err)
      }
      if(a === null) { return }

      // debugger
      this.relatedMessages = a
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

    this.$depject_api.getThread[0](
      this.message.key(), this.setRelatedMessages
    )

    this.image_url = this.$depject_api.avatar_image[0](
      this.message.value.author()
    )
  }
}

</script>

<style scoped>
</style>
