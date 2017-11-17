<template>
  <div class="row">
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
  subscriptions: function () {
    return {
      messages: this.$observers.accumulated_observable(
        this.$depject_api.sbot_createLogStream[0](
          { limit: 60, reverse: true, live: true }
        )
      )
    }
  }
}
</script>

<style scoped>
</style>
