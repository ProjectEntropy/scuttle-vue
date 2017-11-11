
<template>
  <div class="media">
    <img class="d-flex mr-3" :alt="author" :src="image_url">
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
      image_url: "http://via.placeholder.com/90x90"
    }
  },
  methods: {
    setAuthor(err, a){
      this.author = nn( a[0] ).name()
    },
    set_image_url(url)
    {
      this.image_url = url
    },
    content_text()
    {
      return md.block( this.message.value.content.text() )
    }
  },
  created() {
    // author name
    this.$depject_api.signifier[0](
      this.message.value.author(), this.setAuthor
    )

    // image_url
    this.$depject_api.avatar_image[0](
      this.message.value.author(), "profile", this.set_image_url
    )
  }
}

</script>

<style scoped>
</style>
