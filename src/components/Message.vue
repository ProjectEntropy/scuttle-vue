<template>
  <div class="media mt-3 col-sm-12 message">
    <img class="pr-3 rounded " style="max-width: 60px; " :src="image_url">
    <div class="media-body">
      <h5 class="mt-0">
        <router-link :to="{ params: { hash: message.value.author() }}"><span class="">{{ author }}</span></router-link>

        <span class="text-muted">
          {{ message.value.content.type() }}
          <span class="text-dark" v-if="message.value.content.channel()">#{{ message.value.content.channel() }}</span>
        </span>
      </h5>

      <p v-html="content_text_md()"></p>

      <p v-if="raw">
        <pre v-html="content_json()"></pre>
      </p>

      <div class="float-right text-muted small">
        <timeago v-if="message.value.timestamp()" :since="message.value.timestamp()" :auto-update="60"></timeago>

        <span v-if="relatedMessages.length > 0">| {{ relatedMessages.length }} replies</span>
        <!-- <a class="" @click="raw = !raw">Raw</a> -->
      </div>
      <!-- {{ relatedMessages }} -->
      <!-- <message v-for="mess in relatedMessages" :message="mess">
      </message> -->

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
      relatedMessages: [],
      raw: false
    }
  },

  methods: {
    setAuthor(err, a) {
      if(a[0] == null)
        return
      this.author = nn( a[0] ).name()
    },

    setRelatedMessages(err, a, rel) {
      if(err) {
        console.log('message.vue.setRelatedMessages.err', err)
      }
      if(a.length > 1) {
        // console.log(a)
        // remove last item as it's a ref to this message
        a = a.splice(-1,1)
        this.relatedMessages = a//.map(function(e){ return nn(e) })
      }
    },

    // Get raw pretty printed json version of message
    content_json() {
      return JSON.stringify(this.message.value(), null, 2)
    },

    // Get markdown formatted version of message content
    content_text_md() {
      return md.block( this.message.value.content.text() )
    }

  },
  updated() {
    this.image_url = this.$dethrashed_avatar_image(
      this.message.value.author()
    )
  },
  mounted() {
    // author name
    this.$dethrashed_signifier(
      this.message.value.author(), this.setAuthor
    )

    // if(this.message.key())
    // {
    //   this.$depject_api.getThread[0](
    //     this.message.key(), this.setRelatedMessages
    //   )
    // }


    // this.content_text_md = this.$depject_api.markdown[0](this.message.value.content())
  }
}

</script>

<style scoped>
.media-body p {
  white-space: wrap;
  text-overflow: ellipsis;
}
</style>
