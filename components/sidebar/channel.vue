<template>
  <ul>
    <li
      v-for="channel in channels.list"
      :key="channel.channelId"
      @click="changeChat(channel)"
      :class="{'active': channel.channelId === channels.now.channelId}"
    >
      {{channel.name}}
      <i class="fas fa-times"></i>
    </li>
  </ul>

</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'channel',
    data() {
      return {}
    },
    computed: {
      list() {
        return Object.values(this.channels.list)
      },
      ...mapState({
        channels: state => state.channels
      })
    },
    methods: {
      newKey() {
        return new Date().getTime() + ''
      },
      changeChat(channel) {
        this.SET_NOW_CHANNE(channel)
      },
      ...mapMutations({
        SET_NOW_CHANNE: 'SET_NOW_CHANNE'
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import 'assets/variables.scss';
  .channel_tab {
    background-color: $grayBgLight;
    ul {
      display: flex;
      list-style: none;
    }
    li {
      background-color: $grayTab;
      padding: 4px 12px;
      cursor: pointer;
      &.active {
        background-color: $grayBg;
      }
    }
  }
  .sidebar_sec_content {
    li {
      cursor: pointer;
      &.active {
        background-color: $grayBgLightHover;
      }
    }
  }
</style>