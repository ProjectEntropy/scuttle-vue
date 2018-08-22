<template>
  <div id="public" class="row">
    <div class="col-md-12">
      <Composer></Composer>
      
      <Message v-for="message in messages" :message="message"></Message>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"
import Composer from "./Composer.vue"

import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'public',
  components: {
    Message,
    InfiniteLoading,
    Composer
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
          { limit: 5, reverse: true, live: true }
        )

      )
    }
  }
}
</script>

<style scoped>
</style>
