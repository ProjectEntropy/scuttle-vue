
<template>
  <div class="media">
    <img class="d-flex mr-3" :alt="author">
    <div class="media-body">
      <h5 class="mt-0">{{ author }}</h5>
      {{ message.value.content.text() }}

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
const nn = require('nevernull');

export default {
  name: 'message',
  props: ['message'],
  data () {
    return {
      author: "..."
    }
  },
  methods: {
    setAuthor(err, a){
      this.author = nn(a[0]).name()
    }
  },
  created() {
    this.$depject_api.signifier[0](this.message.value.author(), this.setAuthor)
  }
}

</script>

<style scoped>
</style>
