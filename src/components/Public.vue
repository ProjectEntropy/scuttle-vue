<template>
  <div id="public" class="row">
    <div class="col-md-12">
      <Message v-for="message in messages" :message="message"></Message>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'public',
  components: {
    Message,
    InfiniteLoading
  },
  data() {
    return {
      list: [],
      lastMsg: {}
    }
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        console.log('messages', this.messages)
        // this.lastMsg = this.messages.slice(-1)[0]() // a timestamp 1510740987518
        console.log('last message', this.lastMsg)
        const temp = []
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i)
        }
        this.list = this.list.concat(temp);
        $state.loaded()
      }, 1000)
    }
  },
  subscriptions: function () {
    return {
      messages: this.$observers.accumulated_observable(
      //   this.$depject_api.sbot_user_feed[0](
      //     { id: '@dfCIY3rP5idQFdjuOHrBJqrv6EgsSiNyn1NKz87UTJw=.ed25519', lte: 1502583510, limit: 20, reverse: false, live: true } // fillCache: true = leveldb LRU-cache filled with read data
      //   )

      // dangerousbeans: createLogStream appears to output the same feed as sbot_log
      // but without being wrapped in a pull-stream
      // see sbot.js line 114 to 124
      // ought to be able to filter with lt lte gt gte on timestamp but it doesn't seem to work
      // eg gte: 1510707316, lte: 1510756323,
      this.$depject_api.sbot_createLogStream[0](
        { limit: 60, reverse: true, live: true }
      )

      // this.$depject_api.sbot_getLatest[0](
      //   function (e) {
      //     console.log('sbot_getLatest', e)
      //     return e
      //   }
      // )
      // sbot_getLatest
      )
    }
  }
}
</script>

<style scoped>
</style>
