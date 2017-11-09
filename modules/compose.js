'use strict'
var h = require('hyperscript')
var u = require('../util')
var suggest = require('suggest-box')
var mentions = require('ssb-mentions')
var lightbox = require('hyperlightbox')
var cont = require('cont')

exports.needs = {
  suggest_mentions: 'map',
  publish: 'first',
  message_content: 'first',
  message_confirm: 'first',
  file_input: 'first'
}

exports.gives = 'message_compose'

function id (e) { return e }

/*
  opts can take

    placeholder: string. placeholder text, defaults to "Write a message"
    prepublish: function. called before publishing a message.
    shrink: boolean. set to false, to make composer not shrink (or hide controls) when unfocused.
*/

exports.create = function (api) {

  return function (meta, opts, cb) {
    if('function' === typeof cb) {
      if('function' === typeof opts)
        opts = {prepublish: opts}
      }

    if(!opts) opts = {}
    opts.prepublish = opts.prepublish || id

    var accessories
    meta = meta || {}
    if(!meta.type) throw new Error('message must have type')

    var publishBtn = h('button.compose__button', 'Preview', {onclick: publish})

    var ta = h('textarea', {
      placeholder: opts.placeholder || 'Write a message',
      style: {height: opts.shrink === false ? '200px' : ''}
    })

    accessories = h('div.row.compose__controls',
      {style: {display: 'none'}},
      api.file_input(function (file) {
        files.push(file)
        filesById[file.link] = file
        var embed = file.type.indexOf('image/') === 0 ? '!' : ''
        ta.value += embed + '['+file.name+']('+file.link+')'
        console.log('added:', file)
      }),
    publishBtn)


    if(opts.shrink !== false) {
      var blur
      ta.addEventListener('focus', function () {
        clearTimeout(blur)
        if(!ta.value) {
          ta.style.height = '200px'
        }
        accessories.style.display = 'block'
      })
      ta.addEventListener('blur', function () {
        if(ta.value) return
        ta.style.height = '50px'
        accessories.style.display = 'none'
      })
    }

    //ta.addEventListener('keydown', function (ev) {
    //  if(ev.keyCode === 13 && ev.ctrlKey) publish()
    //})

    var files = []
    var filesById = {}

    function publish() {
      publishBtn.disabled = true
      var content
      try {
        content = JSON.parse(ta.value)
      } catch (err) {
        meta.text = ta.value
        //meta.channel = (channel.value.startsWith('#') ?
        //  channel.value.substr(1).trim() : channel.value.trim()) || null
        meta.mentions = mentions(ta.value).map(function (mention) {
          // merge markdown-detected mention with file info
          var file = filesById[mention.link]
          if (file) {
            if (file.type) mention.type = file.type
            if (file.size) mention.size = file.size
          }
          return mention
        })
        try {
          meta = opts.prepublish(meta)
        } catch (err) {
          publishBtn.disabled = false
          if (cb) cb(err)
          else alert(err.message)
        }
        return api.message_confirm(meta, done)
      }

      api.message_confirm(content, done)

      function done (err, msg) {
        publishBtn.disabled = false
        if(err) return alert(err.stack)
        else if (msg) ta.value = ''

        if (cb) cb(err, msg)
      }
    }


    var composer =
      h('div.compose', 
        h('div.column', 
          ta, 
          accessories 
        )
      )

    suggest(ta, function (name, cb) {
      cont.para(api.suggest_mentions(name))
        (function (err, ary) {
          cb(null, ary.reduce(function (a, b) {
            if(!b) return a
            return a.concat(b)
          }, []))
        })
    }, {})

    return composer
  }

}


