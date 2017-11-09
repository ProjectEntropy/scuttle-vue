var h = require('hyperscript')

module.exports = {
  gives: {connection_status: true, menu: true},
  create: function (api) {

    var status = h('div.status.error')
    var list = h('div.menu.column')

    var menu = h('div.column', status, list)

    return {
      connection_status: function (err) {
        if(err) status.classList.add('error')
        else    status.classList.remove('error')
      },
      menu: function () {
        return menu
      }
    }
  }
}






