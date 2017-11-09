var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')
var Scroller = require('pull-scroll')
var id = require('../keys').id

exports.needs = {
  publish: 'first',
  avatar_edit: 'first'
}

exports.gives = {
  screen_view: true
}

exports.create = function (api) {
  return {
    screen_view: function (path, sbot) {
      if(path === 'Identify') {
        if(process.title === 'browser') {
          var identify = h('input.identify', {placeholder: 'Your Name', name: 'namespace'})
          var div = h('div.column.scroller', {style: 'overflow: auto;'},
            h('div.scroller__wrapper',
              h('div.column.scroller__content',
                  h('h1', 'You\'re in! Now, you need a name'),
                  h('p', {innerHTML: '<p>You\'ve just generated a new public/private keypair: <pre><code>' + localStorage['browser/.ssb/secret'] + '</code></pre> You\'re the only person with access to the private key. If you want to hang onto this identity, save this key somewhere safe.<hr />'}),
                  h('p', {innerHTML: 'Right now, you\'re only identified by your public key: <code>' + id + '</code></p><p>Start by giving yourself a name:'},
                  api.avatar_edit(id),
                  h('p', {innerHTML: 'Once you\'re done, navigate to <a href="./index.html">your feed</a>.'})
                )
              )
            )
          )
          return div
        }
      }
    }
  }
}

