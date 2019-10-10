<template>
  <div
    class="chat_main"
    ref="chat_main"
  >
    <div class="channel_tab">
      <channels />
    </div>
    <div
      class="chat_content"
      ref="chat_content"
    >
      <div v-if="channels.now">
        <div
          v-for="chat in channels.now.msg"
          :key="chat.key + chat.text"
        >
          <component
            :is="chat.codeClass"
            :text="chat.text"
            :name="chat.name"
            @scrollBottom="scrollBottom"
          />
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
        <div
          class="commment"
          v-if="otherStatus"
        >
          <p>{{ guildText }}</p>
        </div>
        <div class="msg_input">
          user:project $
          <input
            type="text"
            v-model="msg"
            ref="textInput"
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
    asyncData({ store, redirect, route }) {
      console.log(store.state.loginData)
      if (!store.state.loginData.memberId) {
        redirect('/')
      }
    },
    data() {
      return {
        msg: '',
        codeClass: 'codeClassFunc',
        isInput: false,
        otherStatus: false,
        guildText: '',
        codeClassMap: {
          html: 'codeClassHtml',
          func: 'codeClassFunc'
        },
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
          },
          {
            name: 'blblblblbl',
            text: '我的老天鵝',
            codeClass: 'codeClassRegExp',
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
      commandMatch(str) {
        console.log('commandMatch')
        let re = /^npm\s/
        return re.test(str)
      },
      commandList(str) {
        console.log('commandList')
        if (/change\sstyle/.test(str)) {
          this.guildText = `input new msg style(html,func)`
          this.otherStatus = true
          this.msg = ''
        }
      },
      keyHandler() {
        if (!this.msg) return false

        if (this.otherStatus) {
          if (this.codeClassMap.hasOwnProperty(this.msg.trim())) {
            this.codeClass = this.codeClassMap[this.msg]
          }
          this.msg = ''
          this.otherStatus = false
        } else {
          if (this.commandMatch(this.msg)) {
            this.commandList(this.msg)
          } else {
            const msg = {
              msg: {
                name: this.loginData.memberName,
                text: this.msg,
                codeClass: this.codeClass,
                key: this.newKey()
              },
              channel: {
                channelId: this.channels.now.channelId,
                members: this.channels.now.members
              },
              memberId: this.loginData
            }
            this.$socket.emit('msg', msg, this.scrollBottom)
            this.msg = ''
          }
        }
      },
      scrollBottom() {
        // console.log(this.$refs)
        console.log('aaa')
        console.log(this.$refs)
        let dom = this.$refs.chat_main
        dom.scrollTop = dom.scrollHeight - dom.clientHeight
        console.log(dom.scrollTop, dom.scrollHeight, dom.clientHeight)
      },
      uploadMsg(msg) {
        console.log('uploadMsg', msg)
        this.SET_NEW_MSG(msg)
        // setTimeout(this.scrollBottom, 100)
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
      this.$refs.textInput.focus()

      if (!this.channels.list.length) {
        const newChannel = {
          channelId: 'all',
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
        // this.changeChat(newChannel)
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
  .chat_main {
    padding-left: 200px;
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
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