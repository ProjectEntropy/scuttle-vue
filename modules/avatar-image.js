'use strict'

var getAvatar = require('ssb-avatar')
var h = require('hyperscript')
var ref = require('ssb-ref')
var path = require('path')
var visualize = require('visualize-buffer')
var pull = require('pull-stream')
var self_id = require('../keys').id

exports.needs = {
  sbot_query: 'first',
  blob_url: 'first'
}

exports.gives = {
  connection_status: true,
  avatar_image: true
}

function isFunction (f) {
  return 'function' === typeof f
}

var ready = false
var waiting = []

var last = 0

var cache = {}

exports.create = function (api) {
  var avatars  = {}
  return {
    connection_status: function (err) {
      if (err) return
      pull(
        api.sbot_query({
          query: [{
            $filter: {
              timestamp: {$gt: last || 0 },
              value: { content: {
                type: "about",
                about: {$prefix: "@"},
                image: {$truthy: true}
            }}
          }},
          {
            $map: {
              id: ["value", "content", "about"],
              image: ["value", "content", "image"],
              by: ["value", "author"],
              ts: 'timestamp'
          }}],
          live: true
        }),
        pull.drain(function (a) {
          if(a.sync) {
            ready = true
            while(waiting.length) waiting.shift()()
            return
          }
          last = a.ts
          if (a.image && typeof a.image === 'object') a.image = a.image.link
          //set image for avatar.
          //overwrite another avatar
          //you picked.
          if(
            //if there is no avatar
              (!avatars[a.id]) ||
            //if i chose this avatar
              (a.by == self_id) ||
            //they chose their own avatar,
            //and current avatar was not chosen by me
              (a.by === a.id && avatars[a.id].by != self_id)
          )
            avatars[a.id] = a
        })
      )
    },


    avatar_image: function (author, classes) {
      var img = ready && avatars[author] ? api.blob_url(avatars[author].image) : "http://via.placeholder.com/90x90"
      if(!ready)
        waiting.push(function () {
          if(avatars[author]) img = api.blob_url(avatars[author].image)
        })

      return img
    }
  }
}
