<template>
  <div id="profile" class="row">
    <div class="col-md-12">
      <!-- <h2>Profile feed</h2> -->
      <Message v-for="message in messages" :message="message"></Message>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"

export default {
  name: 'profile',
  components: {
    Message
  },
  data() {
    return {
      whoami: ''
    }
  },
  subscriptions: function () {
    return {
      messages: this.$observers.accumulated_observable(
        this.$depject_api.sbot_user_feed[0]( // todo: whoami 
          { id: '@dfCIY3rP5idQFdjuOHrBJqrv6EgsSiNyn1NKz87UTJw=.ed25519', limit: 200, gte: 170, lte: 199, reverse: false, live: false } // fillCache: true = leveldb LRU-cache filled with read data // lte: seq
        )
      )
    }
  },
  mounted() {
    this.whoami = localStorage.getItem('whoami')
    console.log('whoami', this.whoami) // ugh. looks fine in console! errors when calling id: this.whoami in the subscription
    // Object {message: "Param 0 must have a .id of type "feedId"", name: "UsageError", stack: "UsageError: Param 0 must have a .id of type "feedI…lebot\node_modules\packet-stream\index.js:230:11)"}
    // "Param 0 must have a .id of type "feedId""
    // name
    // :
    // "UsageError"
    // stack
    // :
    // "UsageError: Param 0 must have a .id of type "feedId"↵    at new ZE (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\zerr\index.js:11:42)↵    at ZError (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\zerr\index.js:13:14)↵    at Object.createUserStreamOpts (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\lib\validators.js:142:14)↵    at validate (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\muxrpc-validation\index.js:130:15)↵    at Object.<anonymous> (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\muxrpc-validation\index.js:91:17)↵    at Object.hooked (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\hoox\index.js:10:15)↵    at Object.localCall (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\muxrpc\local-api.js:31:31)↵    at Object.<anonymous> (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\muxrpc\local-api.js:37:22)↵    at PacketStreamSubstream.stream.read (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\muxrpc\stream.js:67:23)↵    at PacketStream._onstream (C:\Users\av8ta\AppData\Roaming\nvm\v8.8.0\node_modules\scuttlebot\node_modules\packet-stream\index.js:230:11)"

  }
}
</script>

<style scoped>
</style>
