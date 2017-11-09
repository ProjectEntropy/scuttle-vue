var h = require('hyperscript')
var ref = require('ssb-ref')

exports.needs = {
  message_name: 'first'
}

exports.gives = 'message_link'

exports.create = function (api) {

  return function (id) {

    if('string' !== typeof id)
      throw new Error('link must be to message id')

    var link = h('a', {href: '#'+id}, id.substring(0, 10)+'...')

    if(ref.isMsg(id))
      api.message_name(id, function (err, name) {
        if(err) console.error(err)
        else link.textContent = name
      })

    return link
  }
}








