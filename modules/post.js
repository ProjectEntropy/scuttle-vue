var markdown = require('ssb-markdown')
var h = require('hyperscript')
var u = require('../util')
var ref = require('ssb-ref')

exports.needs = { message_link: 'first', markdown: 'first' }

exports.gives = 'message_content'

exports.create = function (api) {
  return function (data) {
    if(!data.value.content || !data.value.content.text) return

    var root = data.value.content.root
    var re = !root ? null : h('span', 're: ', api.message_link(root))

    return h('div',
      re,
      api.markdown(data.value.content)
    )

  }
}













