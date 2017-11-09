'use strict'
var dataurl = require('dataurl-')
var hyperfile = require('hyperfile')
var hypercrop = require('hypercrop')
var hyperlightbox = require('hyperlightbox')
var h = require('hyperscript')
var pull = require('pull-stream')
var getAvatar = require('ssb-avatar')
var ref = require('ssb-ref')
var visualize = require('visualize-buffer')
var self_id = require('../keys').id

exports.needs = {
  message_confirm: 'first',
  sbot_blobs_add: 'first',
  blob_url: 'first',
  sbot_links: 'first',
  avatar_name: 'first'
}

exports.gives = 'avatar_edit'

exports.create = function (api) {
  return function (id) {
    var img = visualize(new Buffer(id.substring(1), 'base64'), 256)
    img.classList.add('avatar--profile')

    var lb = hyperlightbox()
    var name_input = h('input', {placeholder: 'New name'})
    var name = api.avatar_name(id)

    var img_input = h('input', {placeholder: 'New profile pic blob url'})

    getAvatar({links: api.sbot_links}, self_id, id, function (err, avatar) {
      if (err) return console.error(err)
      if(ref.isBlob(avatar.image))
        img.src = api.blob_url(avatar.image)
    })

    return h('div.row.profile',
      lb,
      img,
      h('div.column.profile__info',
        h('strong', name),
        name_input,
        h('button', 'Preview', {onclick: function () {
          if(name_input.value) {
            api.message_confirm({
              type: 'about',
              about: id,
              name: name_input.value || undefined
            })
          }
        }}),
        img_input,
        h('button', 'Preview', {onclick: function () {
          if(img_input.value) {
            if (ref.isBlobId(img_input.value)) {
              api.message_confirm({
                type: 'about',
                about: id,
                image: img_input.value || undefined
              })
            } else { alert('The link you uploaded is not a blob, please use a valid blob id. - Example: &G7v7pgTXYfr4bTF7FB/qLiScmFIIOccsTV3Pp6bURB0=.sha256. - To upload a blob: write a normal message, upload a file, and publish. Square photos are best for avatar images.')}
          }
        }})
      )
    )
  }
}
