
<template>
  <div class="media">
<<<<<<< HEAD
    <img class="mr-3 w-25" :src="profile_image"> <!-- alt="Generic placeholder image" -->
    <div class="media-body">
      <h5 class="mt-0">{{ author }}</h5>
      <p>{{ message.value.content.type() }}</p>
      <div v-html="content_text()"></div>
=======
    <img :src="image_url"></img>


    <div class="media-body">
      <h5 class="mt-0">{{ author }}</h5>

      <span v-html="content_text()"></span>

      <p>
        {{ message.value.content.type() }}
      </p>
>>>>>>> b65df85068d01bbc7fd6b0ba8686cccbae6928ee
    </div>
  </div>
</template>

<script>

// var pull = require('pull-stream')
import Rx from 'rxjs/RX'
import { Observable } from 'rxjs/Observable'
const nn = require('nevernull')
const md = require('ssb-markdown')

export default {
  name: 'message',
  props: ['message'],
  data () {
    return {
      author: "...",
      image_url: "http://via.placeholder.com/90x90"
    }
  },
<<<<<<< HEAD
  // subscriptions: function () {
  //   return {
  //     messages: this.$observers.accumulated_observable(
  //       this.$depject_api.sbot_log[0]( { limit: 10, reverse: true, live: true } )
  //     )
  //   }
  // },
  // subscriptions: function () {
  //   // var obj = {
  //   // debugger

  //   // profile_image: Rx.Observable.bindCallback( this.api.avatar_image[0].bind(this) )('@ywmhh72dezK+GrK+/QiYOJ0dKWVuGA/AkpOB/wrWTgk=.ed25519')
  //   // }
  //   // // debugger
  //   //
  //   // return obj
  // },
=======
>>>>>>> b65df85068d01bbc7fd6b0ba8686cccbae6928ee
  computed: {
    // profile_image: function(){
    //   // Get blob for about image
    //   // return this.$depject_api.avatar[0]("@TXKFQehlyoSn8UJAIVP/k2BjFINC591MlBC2e2d24mA=.ed25519")}
    // }
  },
  methods: {
    setAuthor(err, a){
      if(a[0] == null)
        return
      this.author = nn( a[0] ).name()
    },

    set_image_url(err, a){
      console.log("Set image URL")
      console.log(err, a)
      // this.image_url = a
    },

    // Get markdown formatted version of message content
    content_text()
    {
      return md.block( this.message.value.content.text() )
    },
    cb(shit){
      console.log(shit)
    }
  },
  updated() {
    // author name
    this.$depject_api.signifier[0](
      this.message.value.author(), this.setAuthor
    ),

    // this.$depject_api.avatar[0]("@TXKFQehlyoSn8UJAIVP/k2BjFINC591MlBC2e2d24mA=.ed25519")}
    // this.image_url = "face"
    this.image_url = this.$depject_api.avatar_image[0](
      this.message.value.author(), this.set_image_url, this.set_image_url
    )
  }
}

</script>

<style scoped>
</style>
