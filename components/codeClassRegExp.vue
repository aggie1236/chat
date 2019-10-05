<template>
  <div class="cp_code_class_func">
    <span class="text-blue">
      <{{'script'}}>
    </span>
    <div class="cont">
      <div class="text-indent_1">
        <span class="text-blue">{{'function'}} </span>
        <span class="text-yellow">{{name}} </span>
        <span>(){</span>
      </div>
      <div class="text-indent_2">
        <div class="text-indent_3">
          <span class="text-lightblue">arr</span>.
          <span class="text-yellow">push</span>(
          <span class="text-orange">'
            <slot />'</span>)
        </div>
        <div>})</div>
      </div>
      <div class="stext-indent_1">
        }
      </div>
    </div>

    <span class="text-blue">
      <{{'/script'}}>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'codeClassFunc',
    components: {},
    props: {
      name: {
        type: String,
        default: 'div'
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  .cp_code_class_func {
  }
</style>
