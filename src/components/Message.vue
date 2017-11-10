
<template>
  <div class="media">
    <img class="d-flex mr-3" :alt="author">
    <div class="media-body">
      <h5 class="mt-0">{{ message.value.content.type() }}: {{ author }}</h5>
      {{ message.value.content.text() }}
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

  subscriptions: function () {
    return {
      // author: Rx.Observable.create(function (observer) {
      //   pull(
      //     sbot.createLogStream( { limit: 50, reverse: true, live: true } ),
      //     // yield, check ES6 generators
      //     pull.drain(msg => observer.next(msg))
      //   )
      // }).scan((accumulator, newMsg) => [...accumulator, nn(newMsg)], [])
    }
  }

}

</script>

<style scoped>
</style>
