'use strict'
var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')
var Scroller = require('pull-scroll')
var paramap = require('pull-paramap')
var cont = require('cont')
var ref = require('ssb-ref')

exports.needs = {
  message_render: 'first',
  sbot_log: 'first',
  sbot_get: 'first',
  sbot_user_feed: 'first',
  message_unbox: 'first'
}

exports.gives = {
  screen_view: true
}

exports.create = function (api) {
  function unbox() {
    return pull(
      pull.map(function (msg) {
        return msg.value && 'string' === typeof msg.value.content ?
          api.message_unbox(msg) : msg
      }),
      pull.filter(Boolean)
    )
  }

  function notifications(ourIds) {

    function linksToUs(link) {
      return link && link.link in ourIds
    }

    function isOurMsg(id, cb) {
      if (!id) return cb(null, false)
      if (typeof id === 'object' && typeof id.link === 'string') id = id.link
      if (!ref.isMsg(id)) return cb(null, false)
      api.sbot_get(id, function (err, msg) {
        if (err && err.name == 'NotFoundError') cb(null, false)
        else if (err) cb(err)
        else if (msg.content.type === 'issue' || msg.content.type === 'pull-request')
          isOurMsg(msg.content.repo || msg.content.project, cb)
        else cb(err, msg.author in ourIds)
      })
    }

    function isAnyOurMessage(msg, ids, cb) {
      cont.para(ids.map(function (id) {
        return function (cb) { isOurMsg(id, cb) }
      }))
      (function (err, results) {
        if (err) cb(err)
        else if (results.some(Boolean)) cb(null, msg)
        else cb()
      })
    }

    return paramap(function (msg, cb) {
      var c = msg.value && msg.value.content
      if (!c || typeof c !== 'object') return cb()
      if (msg.value.author in ourIds) return cb()

      if (c.mentions && Array.isArray(c.mentions) && c.mentions.some(linksToUs))
        return cb(null, msg)

      if (msg.private)
        return cb(null, msg)

      switch (c.type) {
        case 'post':
          if (c.branch || c.root)
            return isAnyOurMessage(msg, [].concat(c.branch, c.root), cb)
          else return cb()

        case 'contact':
          return cb(null, c.contact in ourIds ? msg : null)

        case 'vote':
          if (c.vote && c.vote.link)
            return isOurMsg(c.vote.link, function (err, isOurs) {
              cb(err, isOurs ? msg : null)
            })
            else return cb()

        case 'issue':
        case 'pull-request':
          return isOurMsg(c.project || c.repo, function (err, isOurs) {
            cb(err, isOurs ? msg : null)
          })

        case 'issue-edit':
          return isAnyOurMessage(msg, [c.issue].concat(c.issues), cb)

        default:
          cb()
      }
    }, 4)
  }

  function getFirstMessage(feedId, cb) {
    api.sbot_user_feed({id: feedId, gte: 0, limit: 1})(null, cb)
  }

  return {
    screen_view: function (path) {
      if(path === 'Mentions') {
        var ids = {}
        var oldest

        var id = require('../keys').id
        ids[id] = true
        getFirstMessage(id, function (err, msg) {
          if (err) return console.error(err)
          if (!oldest || msg.value.timestamp < oldest) {
            oldest = msg.value.timestamp
          }
        })

        var content = h('div.column.scroller__content')
        var div = h('div.column.scroller',
          {style: {'overflow':'auto'}},
          h('div.scroller__wrapper',
            content
          )
        )

        pull(
          u.next(api.sbot_log, {old: false, limit: 100}),
          unbox(),
          notifications(ids),
          pull.filter(),
          Scroller(div, content, api.message_render, true, false)
        )

        pull(
          u.next(api.sbot_log, {reverse: true, limit: 100, live: false}),
          unbox(),
          notifications(ids),
          pull.filter(),
          pull.take(function (msg) {
            // abort stream after we pass the oldest messages of our feeds
            return !oldest ? true : msg.value.timestamp > oldest
          }),
          Scroller(div, content, api.message_render, false, false)
        )

        return div
      }
    }
  }
}

