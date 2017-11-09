var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')

exports.needs = {
  message_confirm: 'first',
  message_link: 'first',
  sbot_links: 'first',
  emoji_url: 'first'
}

exports.gives = {
  message_content: true,
  message_content_mini: true,
  message_meta: true,
  message_action: true
}

exports.create = function (api) {
  var exports = {}

  exports.message_content =
  exports.message_content_mini = function (msg, sbot) {
    var star = api.emoji_url('star')
    var stars = api.emoji_url('stars')
    if(msg.value.content.type !== 'vote') return
    var link = msg.value.content.vote.link
    return [
        msg.value.content.vote.value > 0 
        ? h('img', {className: 'emoji', src: star}) 
        : h('img', {className: 'emoji', src: stars}),
        ' ', api.message_link(link)
      ]
  }

  exports.message_meta = function (msg, sbot) {
    var star = api.emoji_url('star')
    var digs = h('a')

    var votes = []
    for(var k in CACHE) {
      if (CACHE[k].content.vote != null) {
        if(CACHE[k].content.type == 'vote' &&
        (CACHE[k].content.vote == msg.key ||
        CACHE[k].content.vote.link == msg.key
        ))
        votes.push({source: CACHE[k].author, dest: k, rel: 'vote'})
      }
    }
    var digs
    for (i = 0; i < votes.length; i++) {
      digs = '<img src="' + star + '" class="emoji">' + digs
    }
    return h('span', {innerHTML: digs})
  }

  exports.message_action = function (msg, sbot) {
    var star = api.emoji_url('star')
    if(msg.value.content.type !== 'vote')
      return h('a.dig', {href: '#', onclick: function (e) {
        e.preventDefault()
        var dig = {
          type: 'vote',
          vote: { link: msg.key, value: 1, expression: 'Star' }
        }
        if(msg.value.content.recps) {
          dig.recps = msg.value.content.recps.map(function (e) {
            return e && typeof e !== 'string' ? e.link : e
          })
          dig.private = true
        }
        api.message_confirm(dig)
      }}, h('img', {className: 'emoji', src: star}))

  }
  return exports
}
