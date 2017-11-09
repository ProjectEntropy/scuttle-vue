var isVisible = require('is-visible').isVisible
var human = require('human-time')
var h = require('hyperscript')

exports.needs = {
  avatar: 'first',
  sbot_gossip_peers: 'first',
  sbot_gossip_connect: 'first'
}

exports.gives = {
  screen_view: true
}

function legacyToMultiServer(addr) {
  return 'net:'+addr.host + ':'+addr.port + '~shs:'+addr.key.substring(1).replace('.ed25519','')
}

function isLocal (e) {
  return ip.isPrivate(e.host) && e.type === 'local'
}

function isLongterm (e) {
  return e.ping && e.ping.rtt && e.ping.rtt.mean > 0
}

function isLegacy (peer) {
  return /connect/.test(peer.state) || (peer.duration && peer.duration.mean) > 0 && !isLongterm(peer)
}

function isInactive (e) {
  return e.stateChange && (e.duration && e.duration.mean == 0)
}

function isUnattempted (e) {
  return !e.stateChange
}

function getType (e) {
  return (
      isLongterm(e)    ? 'modern'
    : isLegacy(e)      ? 'legacy'
    : isInactive(e)    ? 'inactive'
    : isUnattempted(e) ? 'unattempted'
    :                    'other' //should never happen
  )
}

function origin (e) {
  return e.source === 'local' ? 0 : 1
}

var states = {
  connected: 3,
  connecting: 2
}

var types = {
  modern: 4,
  legacy: 3,
  inactive: 2,
  unattempted: 1,
  other: 0
}

function round(n) {
  return Math.round(n*100)/100
}

function duration (s) {
  if(!s) return s
  if (Math.abs(s) > 30000)
    return round(s/60000)+'m'
  else if (Math.abs(s) > 500)
    return round(s/1000)+'s'
  else
    return round(s)+'ms'
}

exports.create = function (api) {

  return {
    screen_view: function (path) {

      if(path !== 'Network') return

      var ol = h('div.network')

      ;(function poll () {

        if(!isVisible(ol))
          return setTimeout(poll, 1000)

        api.sbot_gossip_peers(function (err, list) {
          ol.innerHTML = ''
          list.sort(function (a, b) {
            return (
              (states[b.state] || 0) - (states[a.state] || 0)
              || origin(b) - origin(a)
              || types[getType(b)] - types[getType(a)]
              || b.stateChange - a.stateChange
            )
          }).forEach(function (peer) {
            ol.appendChild(h('div.message',
              api.avatar(peer.key, 'thumbnail'),
              h('div',
                peer.state || 'not connected',
                ' ',
                getType(peer),
                ' ',
                (peer.ping && peer.ping.rtt) ? duration(peer.ping.rtt.mean) : '',
                ' ',
                (peer.ping && peer.ping.skew) ? duration(peer.ping.skew.mean) : '',
                h('label',
                  {title: new Date(peer.stateChange).toString()},
                  peer.stateChange && ('(' + human(new Date(peer.stateChange))) + ')')
                ),
                'source:'+peer.source,
                h('pre', legacyToMultiServer(peer)),
                h('button', 'connect', {onclick: function () {
                  api.sbot_gossip_connect(peer, function (err) {
                    if(err) console.error(err)
                    else console.log('connected to', peer)
                  })
                }})
              )
            )
          })
          setTimeout(poll, 1000)
        })
      })()
      return h('div.column.scroller', h('div.column.scroll-y', h('div.column.scroller__wrapper', ol)))
    }
  }
}


