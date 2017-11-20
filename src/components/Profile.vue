<template>
  <div id="profile" class="row">
    <div class="col-md-12">
      <Feed :id="public_key"></Feed>
    </div>
  </div>
</template>

<script>
import Feed from './Feed.vue'

export default {
  name: 'profile',
  components: {
    Feed
  },
  data() {
    return {
      public_key: ''
    }
  },
  created() {
    // Get your current public key out of the localStorage secret
    var pub_key = JSON.parse(localStorage.getItem('/.ssb/secret')).public
    pub_key = '@' + pub_key
    this.public_key = pub_key
  }
}
</script>

<style scoped>
</style>
