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
        <p>
          <span class="text-pink">if </span>(
          <span class="text-lightblue">{{ 'arr.length ' }}</span>
          {{'< 2)'}}
          <span class="text-pink">return </span>arr
        </p>
        <div class="">
          <span class="text-lightblue">arr</span>.
          <span class="text-yellow">forEach</span>( c => {
        </div>
        <!-- <div class="text-indent_3 text-green font-sm">
          //
          
        </div> -->
        <div class="text-indent_3">
          <span class="text-lightblue">arr</span>.
          <span class="text-yellow">push</span>(
          <span class="text-orange">'
            {{ text }}'</span>)
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
      },
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
      console.log('mounted')
      this.$emit('scrollBottom')
    }
  }
</script>
<style lang="scss" scoped>
  .cp_code_class_func {
    .cont {
      text-indent: 2em;
    }
  }
</style>
