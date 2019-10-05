<template>
  <div class="cp_code_class_html">
    <span class="text-blue">
      <{{ name }}
        </span>
        <span
        class="text-lightblue"
      >class
    </span>
    =
    <span class="text-orange">"text-center bg-yellow"</span>
    >
    {{text}}
    <span class="text-blue"></{{ name }}></span>
  </div>
</template>

<script>
  export default {
    name: 'codeClassHtml',
    props: {
      name: {
        type: String,
        default: 'div'
      },
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cp_code_class_html {
  }
</style>
