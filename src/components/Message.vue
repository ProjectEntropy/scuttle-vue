
<template>
  <div class="media mt-3 col-sm-12 message">
    <img class="pr-3 rounded " style="max-width: 60px; " :src="image_url">
    <div class="media-body">
      <h5 class="mt-0">
        {{ author }}
        <span class="text-muted">
          {{ message.value.content.type() }}
          <strong v-if="message.value.content.channel()">#{{ message.value.content.channel() }}</strong>
        </span>
      </h5>

      <p v-html="content_text()"></p>

    </div>

    {{ relatedMessages.length }}
    <message v-for="message in relatedMessages" :message="message">
    </message>

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
      relatedMessages: []
    }
  },

  methods: {
    setAuthor(err, a){
      if(a[0] == null)
        return
      this.author = nn( a[0] ).name()
    },

    setRelatedMessages(err, a){
      if(err) {
        console.log('message.vue.setRelatedMessages.err', err)
      }
      if(a)
        this.relatedMessages = a.every(function(e){ return nn(e) })
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

    if(this.message.key())
    {
      this.$depject_api.getThread[0](
        this.message.key(), this.setRelatedMessages
      )
    }
    this.image_url = this.$depject_api.avatar_image[0](
      this.message.value.author()
    )
  }
}

</script>

<style scoped>
.media-body p{

  white-space: wrap;
  text-overflow: ellipsis;
}
.message{

}
</style>
