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
      var defaultTheme = require('../theme.css.json')
      if (localStorage.style == null) {
        localStorage.style = defaultTheme
      }

      document.head.appendChild(h('style', localStorage.style))

      if(path === 'Theme') {
        var theme = h('textarea.theme', localStorage.style)
        var content = h('div.column.scroller__content')
        var div = h('div.column.scroller',
          {style: {'overflow':'auto'}},
          h('div.scroller__wrapper',
            h('div.column.scroller__content',
              h('div.message',
                h('h1', 'Theme'),
                h('p', {innerHTML: 'Style your client using cascading style sheets (css) in the textarea below. Your styles will be saved into <code>localStorage.style</code>. Use the reset button below if you get too creative.'}),
                theme,
                h('br'),
                h('button', {onclick: function (e){
                  if(theme.value) {
                    localStorage.style = theme.value 
                    e.preventDefault()
                    alert('Theme updated')
                  }
                  location.hash = ""
                  location.reload()
                }}, 'Save'),
                h('button', {onclick: function (e){
                  delete localStorage.style
                  e.preventDefault()
                  alert('Reset to default theme')
                  location.hash = ""
                  location.reload()
                }}, 'Reset')
              )
            )
          )
        )
        return div
      }  
    }
  }
}

