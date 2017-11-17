<template>
  <fieldset class="row">
    <div class="col-sm-12">
      <p>
        <h5>Private Identity</h5>
        <div class="input-group">
          <span class="input-group-addon" id="identity-value">
            secret
          </span>
          <textarea class="form-control"
                    v-model.trim="identity.value"
                    @input="updateValue(identity.key, $event.target.value)"
                    placeholder="~/.ssb secret"
                    aria-label="~/.ssb secret"
                    aria-describedby="identity-value">
          </textarea>
        </div>
      </p>
      <p>
        <h5>Websocket URL</h5>
        <div class="input-group">
          <span class="input-group-addon" id="remoteWebsocket-value">
            {{remoteWebsocket.key}}
          </span>
          <textarea class="form-control"
                    v-model.trim="remoteWebsocket.value"
                    @input="updateValue(remoteWebsocket.key,
                    $event.target.value)"
                    placeholder="websocket url"
                    aria-label="remoteWebsocket-value"
                    aria-describedby="remoteWebsocket-value">
          </textarea>
        </div>
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
