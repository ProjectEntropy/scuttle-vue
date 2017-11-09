
<template>
  <div class="media">
    <img class="d-flex mr-3" src="..." :alt="message.value.author()">
    <div class="media-body">
      <h5 class="mt-0">{{ message.value.author() }}</h5>
      {{ message.value.content.text() }}
    </div>
  </div>
</template>

<script>

// var pull = require('pull-stream')
// import Rx from 'rxjs/RX'
// import { Observable } from 'rxjs/Observable'

export default {
  name: 'message',
  props: ['message']
}

</script>

<style scoped>
</style>
