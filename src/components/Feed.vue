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
  name: 'Feed',
  props: ['id'],
  components: {
    Message
  },
  data() {
    return {
      link: '',
      messages: []
    }
  },
  subscriptions: function () {
    if(this.id) {
      this.link = this.id
    } else {
      this.link = this.$route.params.id
    }
    // console.log('Component.Feed.link', this.link)
    return {
      messages: this.$observers.accumulated_observable(
        this.$depject_api.sbot_user_feed[0](
          { id: this.link,
            limit: 5,
            reverse: true,
            live: true
          } // fillCache: true = leveldb LRU-cache filled with read data // lte: seq
        )
      )
    }
  }
}
</script>

<style scoped>
</style>
