<template>
  <fieldset class="row">
    <div class="col-sm-12">
      <p>
    <h5>Private Identity</h5>
    <div class="input-group">
      <span class="input-group-addon" id="identity-key">key</span>
      <input type="text" class="form-control" v-model.trim="identity.key" placeholder="~/.ssb secret localStorage key" aria-label="~/.ssb secret localStorage key" aria-describedby="identity-key">
      <span class="input-group-addon" id="identity-value">value</span>
      <input type="text" class="form-control" v-model.trim="identity.value" @input="updateValue(identity.key, $event.target.value)" placeholder="~/.ssb secret" aria-label="~/.ssb secret" aria-describedby="identity-value">
    </div>
          </p>
      <p>
    <h5>Websocket URL</h5>
    <div class="input-group">
      <span class="input-group-addon" id="remoteWebsocket-key">key</span>
      <input type="text" class="form-control" v-model.trim="remoteWebsocket.key" placeholder="remote websocket localStorage key" aria-label="remote websocket localStorage key" aria-describedby="identity-key">
      <span class="input-group-addon" id="remoteWebsocket-value">value</span>
      <input type="text" class="form-control" v-model.trim="remoteWebsocket.value" @input="updateValue(remoteWebsocket.key, $event.target.value)" placeholder="websocket url" aria-label="remoteWebsocket-value" aria-describedby="remoteWebsocket-value">
    </div>
          </p>
      <p>
        A fresh keypair is generated automatically on first load. 
        If you have an existing scuttleverse identity, you can paste it in above.
      </p>
      <p>
        If you're running sbot locally you will find your keypair in ~.ssb/secret.
        Please back up your secret securely. Otherwise you could lose that identity.
      </p>
      <p>
        Be careful to never share the private part of the keypair with anyone. They could impersonate you!
      </p>
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
