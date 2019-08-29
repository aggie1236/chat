<template>
  <button @click="clickSoc">clickMe</button>
</template>

<script>
export default {
  components: {
  },
  methods:{
    clickSoc(){
      console.log('click')
      this.$socket.emit('TEST', '棒棒')
    }
  },
  mounted(){
  }
}
</script>
