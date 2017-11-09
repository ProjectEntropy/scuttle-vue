
<template>
  <div id="public" class="col-md-6">
    <h2>Public</h2>
    <Message v-for="message in messages" :message="message">
    </Message>
  </div>
</template>

<script>
import Message from "./Message.vue"
var pull = require('pull-stream')
import Rx from 'rxjs/RX'
import { Observable } from 'rxjs/Observable'

// safe nul checking thing
const nn = require('nevernull');

export default {
  name: 'public',
  components: {
    "Message": Message
  },
  subscriptions: function () {
    return {
      messages: Rx.Observable.create(function (observer) {
        pull(
          sbot.createLogStream( { limit: 50, reverse: true, live: true } ),
          // yield, check ES6 generators
          pull.drain(msg => observer.next(msg))
        )
      }).scan((accumulator, newMsg) => [...accumulator, nn(newMsg)], [])
    }
  }
}
</script>

<style scoped>

</style>
