<template>
  <div class="face">
    <div>
      <ul class="face_content">
        <li
          v-for="(item,idx) in face"
          :key="idx"
          @click="chooseFace(idx)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'face',
    data() {
      return {
        face: ['(*´∀`)~♥', 'σ`∀´)σ', '(*ﾟ∀ﾟ*)', '(ﾟ∀ﾟ)', '(ゝ∀･)', '(ﾟ∀。)', '(´・ω・`)', '。･ﾟ･(つд`ﾟ)･ﾟ･']
      }
    },
    methods: {
      chooseFace(idx) {
        this.$emit('chooseFace', this.face[idx])
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'assets/variables.scss';
  .face {
    background-color: $grayBgLight;
    padding: 10px;
    position: absolute;
    width: 300px;
    bottom: 68px;
  }
  .face_content {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    li {
      padding: 4px;
      &:hover {
        background-color: $grayBgLightHover;
        border-radius: 2px;
      }
    }
  }
</style>
