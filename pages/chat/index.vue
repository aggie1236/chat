<template>
  <div>
    <div class="channel_tab">
      <channels />
    </div>
    <div class="chat_content">
      <div v-if="channels.now">
        <div
          v-for="chat in channels.now.msg"
          :key="chat.key + chat.text"
        >
          <component
            :is="chat.codeClass"
            :name="chat.name"
          >{{chat.text}}
          </component>
        </div>
      </div>

    </div>
    <div class="msg_input_area">
      <div>
        <div class="msg_tab">
          <div>PROBLEMS</div>
          <div>OUTPUT</div>
          <div>
            <nuxt-link :to="{path: '/'}">DEBUG CONSOLE</nuxt-link>
          </div>
          <div class="active">TERMINAL</div>
        </div>

        <div class="msg_input">
          user:project $
          <input
            type="text"
            v-model="msg"
            @keyup.enter="keyHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import codeClassHtml from '~/components/codeClassHtml'
  import codeClassFunc from '~/components/codeClassFunc'
  import channels from '~/components/sidebar/channel'
  import { mapState, mapMutations } from 'vuex'
  export default {
    components: {
      codeClassHtml,
      codeClassFunc,
      channels
    },
    layout: 'error',
    asyncData({ store, redirect, route }) {
      console.log(store.state.loginData)
      if (!store.state.loginData.memberId) {
        redirect('/')
      }
    },
    data() {
      return {
        msg: '',
        isInput: false,
        allMsg: [
          {
            name: 'ohiYo',
            text: 'hello',
            codeClass: 'codeClassHtml',
            key: this.newKey()
          },
          {
            name: 'baga',
            text: 'shishishishi',
            codeClass: 'codeClassFunc',
            key: this.newKey()
          }
        ]
      }
    },
    computed: {
      ...mapState({
        loginData: state => state.loginData,
        channels: state => state.channels
      })
    },
    methods: {
      newKey() {
        return new Date().getTime() + ''
      },
      keyHandler() {
        const msg = {
          msg: {
            name: 'ohiYo',
            text: this.msg,
            codeClass: 'codeClassHtml',
            key: this.newKey()
          },
          channel: {
            id: this.channels.now.channelId
          },
          memberId: this.loginData.memberId
        }
        this.$socket.emit('msg', msg)
        this.msg = ''
      },
      uploadMsg(msg) {
        console.log('uploadMsg', msg)
        this.SET_NEW_MSG(msg)
      },
      offline() {
        this.$socket.emit('offline', {
          memberId: this.loginData.memberId
        })
      },
      changeChat(channel) {
        console.log('uploadMsg')
        this.SET_NOW_CHANNE(channel)
      },
      ...mapMutations({
        SET_CHANNEL: 'SET_CHANNEL',
        SET_NOW_CHANNE: 'SET_NOW_CHANNE',
        SET_NEW_MSG: 'SET_NEW_MSG'
      })
    },
    mounted() {
      if (!this.channels.list.length) {
        const newChannel = {
          channelId: 'aaa',
          name: 'undefined',
          msg: [
            {
              name: 'ohiYo',
              text: 'hello',
              codeClass: 'codeClassHtml',
              key: this.newKey()
            },
            {
              name: 'baga',
              text: 'shishishishi',
              codeClass: 'codeClassFunc',
              key: this.newKey()
            }
          ]
        }
        this.SET_CHANNEL(newChannel)
        this.changeChat(newChannel)
      }
      console.log(`uploadMsg${this.loginData.memberId}`)
      this.$socket.on('uploadMsg', this.uploadMsg)
    },
    beforeDestroy() {
      console.log('beforeDestroy')
      this.$socket.off('uploadMsg')
      this.offline()
    },
    destroyed() {
      // this.offline()
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
  // .msg_input_area {
  //   border-top: 2px solid #383838;
  //   position: fixed;
  //   bottom: 0;
  //   width: 100%;
  //   left: 0;
  //   > div {
  //     padding-left: 200px;
  //   }
  //   .msg_input {
  //     padding: 10px;
  //     display: flex;
  //     font-size: 12px;
  //   }
  //   input {
  //     background-color: transparent;
  //     border: 0;
  //     flex: 1;
  //     color: #bbbbbb;
  //     border-bottom: 1px solid #383838;
  //     &:focus {
  //       border: 0;
  //       outline: 0;
  //       border-bottom: 1px solid #333333;
  //     }
  //   }
  // }

  // .msg_tab {
  //   > div {
  //     display: inline-block;
  //     font-size: 8px;
  //     color: #717171;
  //     padding: 5px 8px;
  //     cursor: pointer;
  //   }
  //   > div:hover {
  //     color: #bbbbbb;
  //   }
  //   > div.active {
  //     color: #bbbbbb;
  //     border-bottom: 1px solid #6d6d6d;
  //   }
  // }
</style>