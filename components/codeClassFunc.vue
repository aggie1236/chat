<template>
  <div class="cp_code_class_func">
    <span><{{'script'}}></span>
      {{'function'}} {{name}} (){
        <slot></slot>
      }
    <span></{{'script'}}></span>
    </div>
</template>

<script>
  export default {
    name: 'codeClassFunc',
    components: {},
    props:{
      name:{
        type: String,
        default: 'div'
      }
    },
    data(){
      return {
      }
    },
    methods: {},
    mounted() {}
  };
</script>
<style lang="scss" scoped>
.cp_code_class_func{
  span{
    display: block;
    color: #3D8FC6;
  }
}
</style>
