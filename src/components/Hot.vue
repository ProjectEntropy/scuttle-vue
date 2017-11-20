<template>
  <div class="row">
    <div class="col-md-12">
      <h4>HOT: {{messages.length}}</h4>
      <Message v-for="message in messages" :message="message"></Message>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"

export default {
  name: 'public',
  components: {
    Message
  },
  data() {
    return {
      messages: []
    }
  },
  created(){
    this.$observers.pull_into(this.messages, this.$depject_api.sbot_log[0]({ limit: 60, reverse: true, live: true }))
  }
}
</script>

<style scoped>
</style>
