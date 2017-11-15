var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')
var ref = require('ssb-ref')
var Reconnect = require('pull-reconnect')
var path = require('path')
var config = require('ssb-config/inject')(process.env.ssb_appname)
config.keys = ssbKeys.loadOrCreateSync(path.join(config.path, 'secret'))

function Hash (onHash) {
  var buffers = []
  return pull.through(function (data) {
    buffers.push('string' === typeof data
      ? new Buffer(data, 'utf8')
      : data
    )
  }, function (err) {
    if(err && !onHash) throw err
    var b = buffers.length > 1 ? Buffer.concat(buffers) : buffers[0]
    var h = '&'+ssbKeys.hash(b)
    onHash && onHash(err, h)
  })
}

var createClient = require('ssb-client')

var createConfig = require('ssb-config/inject')

var createFeed   = require('ssb-feed')
var keys = require('../keys')
var ssbKeys = require('ssb-keys')

var CACHE = {}
var cache = CACHE

module.exports = {
  needs: {
    connection_status: 'map'
  },
  gives: {
    sbot_blobs_add: true,
    sbot_links: true,
    sbot_links2: true,
    sbot_query: true,
    sbot_fulltext_search: true,
    sbot_get: true,
    sbot_log: true,
    sbot_user_feed: true,
    sbot_gossip_peers: true,
    sbot_gossip_connect: true,
    sbot_progress: true,
    sbot_publish: true,
    sbot_whoami: true,
    sbot_stream: true,
    sbot_friends_get: true,
    sbot_signs_get: true,
    sbot_relatedMessages_get: true,
    sbot_the_log: true,
    sbot_getLatest: true
  },

  create: function (api) {

    var opts = createConfig()
    var sbot = null
    var connection_status = []

    var rec = Reconnect(function (isConn) {
      function notify (value) {
        isConn(value); api.connection_status(value) //.forEach(function (fn) { fn(value) })
      }

      createClient(keys, {
        manifest: require('../manifest.json'),
        remote: require('../config')().remote,
        caps: config.caps
      }, function (err, _sbot) {
        if(err)
          return notify(err)

        sbot = _sbot
        sbot.on('closed', function () {
          sbot = null
          notify(new Error('closed'))
        })

        notify()
      })
    })

    var internal = {
      getLatest: rec.async(function (id, cb) {
        sbot.getLatest(id, cb)
      }),
      add: rec.async(function (msg, cb) {
        sbot.add(msg, cb)
      })
    }

    var feed = createFeed(internal, keys, {remote: true})

    return {
      connection_status: connection_status,
      sbot_blobs_add: rec.sink(function (cb)  {
        return sbot.blobs.add(cb)
      }),
      sbot_links: rec.source(function (query) {
        return sbot.links(query)
      }),
      sbot_links2: rec.source(function (query) {
        return sbot.links2.read(query)
      }),
      sbot_query: rec.source(function (query) {
        return sbot.query.read(query)
      }),
      sbot_log: rec.source(function (opts) {
        return pull(
          sbot.createLogStream(opts),
          pull.through(function (e) {
            CACHE[e.key] = CACHE[e.key] || e.value
          })
        )
      }),
      sbot_the_log: rec.source(function (opts) {
        return sbot.createLogStream(opts)
      }),
      sbot_getLatest: rec.source(function (opts) {
        return sbot.getLatest(opts)
      }),
      sbot_user_feed: rec.source(function (opts) {
        return sbot.createUserStream(opts)
      }),
      sbot_fulltext_search: rec.source(function (opts) {
        return sbot.fulltext.search(opts)
      }),
      sbot_get: rec.async(function (key, cb) {
        if('function' !== typeof cb)
          throw new Error('cb must be function')
        if(CACHE[key]) cb(null, CACHE[key])
        else sbot.get(key, function (err, value) {
          if(err) return cb(err)
          cb(null, CACHE[key] = value)
        })
      }),
      sbot_gossip_peers: rec.async(function (cb) {
        sbot.gossip.peers(cb)
      }),
      //liteclient won't have permissions for this
      sbot_gossip_connect: rec.async(function (opts, cb) {
        sbot.gossip.connect(opts, cb)
      }),
      sbot_progress: rec.source(function () {
        return sbot.replicate.changes()
      }),
      sbot_publish: rec.async(function (content, cb) {
        if(content.recps)
          content = ssbKeys.box(content, content.recps.map(function (e) {
            return ref.isFeed(e) ? e : e.link
          }))
        else if(content.mentions)
          content.mentions.forEach(function (mention) {
            if(ref.isBlob(mention.link)) {
              sbot.blobs.push(mention.link, function (err) {
                if(err) console.error(err)
              })
            }
          })
        feed.add(content, function (err, msg) {
          if(err) console.error(err)
          else if(!cb) console.log(msg)
          cb && cb(err, msg)
        })
      }),
      sbot_whoami: rec.async(function (cb) {
        sbot.whoami(cb)
      }),
      sbot_stream: rec.source(function (opts) {
        return sbot.stream(opts)
      }),
      sbot_friends_get: rec.async(function (opts, cb) {
        return sbot.friends.get(opts, cb)
      }),
      sbot_relatedMessages_get: rec.async(function (opts, cb) {
        // debugger
        return sbot.relatedMessages(opts, cb)
      }),
      // relatedMessages({ id: "%A8H47IPGp2sxPYYFunKU+9mU52R7pvs8eKEsuFzaWXI=.sha256", count: true }, function (err, msgs) {
        
      //     console.log(JSON.stringify(msgs, null, 2))
        
      //   })
      sbot_signs_get: rec.async(function (opts, cb) {
        return sbot.signs.get(opts, cb)
      }),
    }
  }
}
