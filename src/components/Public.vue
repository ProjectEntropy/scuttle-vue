
<template>
  <div id="public" class="row">
    <div class="col-md-12">
      <h2>Public feed</h2>

      <Message v-for="message in messages" :message="message">
      </Message>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"

export default {
  name: 'public',
  components: {
    "Message": Message
  },
  subscriptions: function () {
    return {
      messages: this.$observers.accumulated_observable(
        this.$depject_api.sbot_log[0](
          { limit: 20, reverse: true, live: true }
        )
      )
    }
  }
}
</script>

<style scoped>
</style>
