<template>
  <div id="invite" class="row">
    <div class="panel col-sm-8">
      <h4>Invite:</h4>
      <pre>{{ $router }}</pre>

      {{status}}
    </div>
  </div>
</template>

<script>
var ssbClient = require('ssb-client')

export default {
  name: 'invite',
  data () {
    return {
      invite: "",
      status: "idle"
    }
  },
  methods: {
    onProgress(text) {
      this.status = text
    },
    onFinish(err, a) {
      console.log("Finished")
      this.status = err + a
    }
  },
  created(){
    this.invite = this.$route.params["part_1"] + this.$route.params["part_2"] + this.$route.params["part_3"]

    console.log("Attempting to use Invite")
    this.$depject_api.invite_accept[0](this.invite, this.onProgress, this.onFinish)
  }
}
</script>

<style scoped>
</style>
