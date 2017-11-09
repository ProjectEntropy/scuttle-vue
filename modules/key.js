var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')
var Scroller = require('pull-scroll')

exports.gives = {
  screen_view: true
}

exports.create = function (api) {
  return {
    screen_view: function (path, sbot) {
      if(path === 'Key') {
        if(process.title === 'browser') {
          var importKey = h('textarea.import', {placeholder: 'import an existing public/private key', name: 'textarea'})
          var importRemote = h('input.import', {placeholder: 'import an existing remote', name: 'textarea'})
          var content = h('div.column.scroller__content')
          var div = h('div.column.scroller',
            {style: {'overflow':'auto'}},
            h('div.scroller__wrapper',
              h('div.column.scroller__content',
                h('div.message',
                  h('h1', 'Your Key'),
                  h('p', {innerHTML: 'Your secret key is: <pre><code>' + localStorage['/.ssb/secret'] + '</code></pre>'},
                    h('button', {onclick: function (e){
                      localStorage['/.ssb/secret'] = ''
                      alert('Your public/private key has been deleted')
                      e.preventDefault()
                      location.hash = ""
                      location.reload()
                    }}, 'Delete Key')
                  ),
                  h('hr'),
                  h('p', {innerHTML: 'Your remote pub is: <pre>' + localStorage.remote + '</pre>'},
                    h('button', {onclick: function (e){
                      localStorage.remote = ''
                      alert('Your remote pub has been deleted')
                      e.preventDefault()
                      location.hash = ""
                      location.reload()
                    }}, 'Delete Pub')
                  ),
                  h('hr'),
                  h('form.column',
                    importKey,
                    importRemote,
                    h('button', {onclick: function (e){
                      if(importKey.value) {
                        localStorage['/.ssb/secret'] = importKey.value.replace(/\s+/g, ' ')
                        e.preventDefault()
                        alert('Your key has been updated')
                      }
                      if(importRemote.value) {
                        localStorage.remote = importRemote.value
                        e.preventDefault()
                        alert('Your remote pub has been updated')
                      }
                      location.hash = ""
                      location.reload()
                    }}, 'Import')
                  )
                )
              )
            )
          )
          return div
        } else { 
          return h('p', 'Your key is saved at .ssb/secret')
        }
      }
    }
  }
}

