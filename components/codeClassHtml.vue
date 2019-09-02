<template>
  <div class="cp_code_class_html">
    <span><{{name}}></span>
      <slot></slot>
    <span></{{name}}></span>
    </div>
</template>

<script>
  export default {
    name: 'codeClassHtml',
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
.cp_code_class_html{
  span{
    color: #3D8FC6;
  }
}
</style>
