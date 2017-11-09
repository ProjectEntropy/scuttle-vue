var h = require('hyperscript')

exports.needs = { signifier: 'first' }

exports.gives = 'avatar_name'

exports.create = function (api) {

  return function name (id) {
    var n = h('span', id.substring(0, 10))

    api.signifier(id, function (_, names) {
      if(names.length) n.textContent = names[0].name
    })

    return n
  }
}

