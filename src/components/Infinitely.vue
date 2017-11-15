<template>
  <div>
    <p v-for="item in list">
      Line:
      <span v-text="item"></span>
    </p>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data() {
      return {
        list: [],
      }
    },
    methods: {
      infiniteHandler($state) {
        setTimeout(() => {
          const temp = []
          for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
            temp.push(i)
          }
          this.list = this.list.concat(temp);
          $state.loaded()
        }, 1000)
      },
    },
    components: {
      InfiniteLoading,
    },
  }
</script>

