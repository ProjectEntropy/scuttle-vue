<template>
  <div id="profile" class="row">
    <div class="col-md-12">
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
      messages: []
    }
  },
  subscriptions: function () {
    // return {
    //   messages: this.$observers.accumulated_observable(
    //     this.$depject_api.sbot_user_feed[0]( // todo: public_key
    //       { id: this.public_key,
    //         limit: 50,
    //         reverse: false,
    //         live: true
    //       } // fillCache: true = leveldb LRU-cache filled with read data // lte: seq
    //     )
    //   )
    // }
  },
  updated() {
    // Get your current public key out of the localStorage secret
    var pub_key = JSON.parse(localStorage.getItem("/.ssb/secret")).public

    pub_key = "@" + pub_key
    this.public_key = pub_key

    console.log("this.public_key: ")
    console.log(this.public_key)
  }
}
</script>

<style scoped>
</style>
