<template>
  <fieldset class="row">
    <div class="col-sm-12">
    
    <b-form-group label="Secret">
      <b-form-textarea v-model.trim="identity.value" @input="updateValue(identity.key, $event.target.value)" placeholder="~/.ssb secret">
      </b-form-textarea>
    </b-form-group>
          
    <b-form-group label="Remote">
      <input type="text" class="form-control" v-model.trim="remoteWebsocket.value" @input="updateValue(remoteWebsocket.key, $event.target.value)" placeholder="websocket url" aria-label="remoteWebsocket-value" aria-describedby="remoteWebsocket-value">
    </b-form-group>
    
     
  </div>
    </fieldset>
</template>

<script>
export default {
  data() {
    return {
      identity: {
        key: '/.ssb/secret'
      },
      remoteWebsocket: {
        key: 'remote'
      }
    }
  },
  created() {
    this.identity.value =
      localStorage["/.ssb/secret"] || ""
    this.remoteWebsocket.value =
      localStorage["remote"] || ""
  },
  methods: {
    updateValue(key, value) {
      if(key === 'remote') {
        value = value.replace(/['"]+/g, '')
      }
      localStorage[key] = value
    }
  }
}
</script>
