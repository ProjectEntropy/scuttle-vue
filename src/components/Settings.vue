<template>
  <div>
    <h5>Identity</h5>
    <div class="input-group">
      <span class="input-group-addon" id="identity-key">key</span>
      <input type="text" class="form-control" v-model.trim="identity.key" placeholder="~/.ssb secret localStorage key" aria-label="~/.ssb secret localStorage key" aria-describedby="identity-key">
      <span class="input-group-addon" id="identity-value">value</span>
      <input type="text" class="form-control" v-model.trim="identity.value" @input="updateValue(identity.key, $event.target.value)" placeholder="~/.ssb secret" aria-label="~/.ssb secret" aria-describedby="identity-value">
    </div>
    <h5>Websocket to sbot</h5>
    <div class="input-group">
      <span class="input-group-addon" id="remoteWebsocket-key">key</span>
      <input type="text" class="form-control" v-model.trim="remoteWebsocket.key" placeholder="remote websocket localStorage key" aria-label="remote websocket localStorage key" aria-describedby="identity-key">
      <span class="input-group-addon" id="remoteWebsocket-value">value</span>
      <input type="text" class="form-control" v-model.trim="remoteWebsocket.value" @input="updateValue(remoteWebsocket.key, $event.target.value)" placeholder="websocket url" aria-label="remoteWebsocket-value" aria-describedby="remoteWebsocket-value">
    </div>
  </div>
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
      localStorage["/.ssb/secret"] || "the secret goes here"
    this.remoteWebsocket.value =
      localStorage["remote"] || "sbot ws.getAddress goes here"
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
