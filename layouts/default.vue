<template>
  <div>
    <nav class="sidebar">
      <i
        class="far fa-plus-square"
        title="add"
        @click="addChat"
      ></i>
      <i class="far fa-folder-open"></i>
      <i class="fas fa-search"></i>
      <i class="fas fa-draw-polygon"></i>
      <i class="fas fa-bezier-curve"></i>
    </nav>
    <div class="sidebar_content">
      <div class="sidebar_sec people_now">
        <div class="title">
          <i class="fas fa-chevron-down"></i>online
        </div>
        <div class="sidebar_sec_content">
          <ul>
            <li
              v-for="m in members"
              :key="m.memberId"
            >{{m.memberName}}</li>
          </ul>
        </div>
      </div>
      <div class="sidebar_sec channel">
        <div class="title">
          <i class="fas fa-chevron-down"></i>channel
        </div>
        <div class="sidebar_sec_content">
          <channels />
        </div>
      </div>
    </div>
    <div
      class="main"
      id="main"
    >
      <nuxt />
    </div>
  </div>
</template>

<script>
  import channels from '~/components/sidebar/channel'
  import { mapState, mapMutations } from 'vuex'
  export default {
    components: {
      channels
    },
    data() {
      return {
        members: null
      }
    },
    computed: {
      ...mapState({
        channels: state => state.channels,
        loginData: state => state.loginData
      })
    },
    methods: {
      uploadMember(memberData) {
        this.members = memberData
        console.log(memberData)
      },
      newKey() {
        return new Date().getTime() + ''
      },
      addChat() {
        this.SET_CHANNEL({
          channelId: this.newKey(),
          name: 'undefined',
          members: [this.loginData.memberId],
          msg: [
            {
              name: 'ddddd',
              text: 'ddddd',
              codeClass: 'codeClassHtml',
              key: this.newKey()
            }
          ]
        })
      },
      ...mapMutations({
        SET_CHANNEL: 'SET_CHANNEL'
      })
    },
    mounted() {
      this.$socket.on('uploadMember', this.uploadMember)
    },
    beforeDestroy() {
      this.$socket.off('uploadMember')
    }
  }
</script>

<style lang="scss">
  @import 'assets/variables.scss';

  body {
    background-color: $grayBg;
    color: #bbbbbb;
    font-size: 14px;
    margin: 0;
    font-family: Microsoft JhengHei;
  }
  .sidebar {
    position: fixed;
    width: 40px;
    height: 100%;
    z-index: 10;
    background-color: $grayUi;
    i {
      font-size: 20px;
      display: block;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: $textGray;
      &:hover {
        color: $textLightGray;
      }
    }
  }
  .sidebar_content {
    position: fixed;
    left: 40px;
    top: 0;
    background-color: $grayBgLight;
    height: 100%;
    width: 160px;
    z-index: 9;
    .title {
      background-color: $grayUi;
      padding: 2px 5px;
    }
    i {
      margin-right: 5px;
    }
  }

  .main {
    padding-left: 200px;
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
</style>