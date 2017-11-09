var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')

exports.needs = {
  message_content: 'first',
  message_content_mini: 'first',
  avatar: 'first',
  avatar_name: 'first',
  avatar_link: 'first',
  message_meta: 'map',
  message_action: 'map',
  message_link: 'first'
}

exports.gives = 'message_render'

function message_content_mini_fallback(msg)  {
  return h('code', msg.value.content.type)
}

exports.create = function (api) {

  function mini(msg, el) {
    var div = h('div.message.message--mini',
      h('div.title.row',
        h('div.avatar', api.avatar_link(msg.value.author, api.avatar_name(msg.value.author), ''), ' ', el),
        h('div.message_meta.row', api.message_meta(msg))
      )
      //h('div.message_content', el)
    )
    //div.setAttribute('tabindex', '0')
    return div
  }

  return function (msg, sbot) {
    var el = api.message_content_mini(msg)
    if(el) return mini(msg, el)

    var el = api.message_content(msg)
     if(!el) return mini(msg, message_content_mini_fallback(msg))
    if(!el) return

    var links = []
    for(var k in CACHE) {
      var _msg = CACHE[k]
      if(Array.isArray(_msg.content.mentions)) {
        for(var i = 0; i < _msg.content.mentions.length; i++)
          if(_msg.content.mentions[i].link == msg.key)
          links.push(k)
      }
    }

    var backlinks = h('div.backlinks')
    if(links.length)
      backlinks.appendChild(h('label', 'backlinks:', 
        h('div', links.map(function (key) {
          return api.message_link(key)
        }))
      ))

    var msg = h('div.message',
      h('div.title.row',
        h('div.avatar', api.avatar(msg.value.author, 'thumbnail')),
        h('div.message_meta.row', api.message_meta(msg))
      ),
      h('div.message_content', el),
      h('div.message_actions',
        h('div.actions', api.message_action(msg),
          h('a', {href: '#' + msg.key}, 'Reply')
        )
      ),
      backlinks//,
      /*{onkeydown: function (ev) {
        //on enter, hit first meta.
        if(ev.keyCode == 13) {

          // unless in an input
          if (ev.target.nodeName === 'INPUT'
            || ev.target.nodeName === 'TEXTAREA') return

          msg.querySelector('.enter').click()
        }
      }}*/
    )

    // ); hyperscript does not seem to set attributes correctly.
    //msg.setAttribute('tabindex', '0')

    return msg
  }
}


