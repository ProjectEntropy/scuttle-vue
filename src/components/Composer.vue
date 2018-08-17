<template>

  <div class="media mt-3 col-sm-12 message">
    <img class="pr-3 rounded " style="max-width: 60px; " :src="image_url">
    <div class="media-body">
      <h5 class="mt-0">
        
        <span class="text-muted">
          <!-- New Post -->
        </span>
      </h5>

      <b-form-textarea id="new_message"
                       v-model="message"
                       placeholder="New public message"
                       :rows="3"
                       :max-rows="6">
      </b-form-textarea> 

      <div class="float-right text-muted">
        <b-button variant="primary" v-on:click='post()' >Post</b-button>        
      </div>
      <!-- {{ relatedMessages }} -->
      <!-- <message v-for="mess in relatedMessages" :message="mess">
      </message> -->

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     public_key: '',
     image_url: '',
     message: ''
    }
  },
  created() {
    // Get your current public key out of the localStorage secret
    var pub_key = JSON.parse(localStorage.getItem('/.ssb/secret')).public
    pub_key = '@' + pub_key
    this.public_key = pub_key

    this.image_url = this.$dethrashed_avatar_image(
      this.public_key
    )
  },
  methods: {
    post()
    {
      // console.log("about to publish" + this.message)
      var message_json = { type: 'post', text: this.message }

      this.$depject_api.publish[0](message_json, )
    }
  }
}
</script>
