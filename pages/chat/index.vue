<template>
  <div>
    <div class="chat_content">
      <div v-for="chat in allMsg" :key="chat.key + chat.text">
        <component :is="chat.codeClass" :name="chat.name">{{chat.text}}</component>
      </div>
    </div>
    <div class="msg_input_area">
      <div>
        <div class="msg_tab">
          <div>PROBLEMS</div>
          <div>OUTPUT</div>
          <div>DEBUG CONSOLE</div>
          <div class="active">TERMINAL</div>
        </div>
        <div class="msg_input">
          user:project $
          <input type="text" v-model="msg" @keydown="keyHandler" />
          <button id="btnSend">send</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import codeClassHtml from "~/components/codeClassHtml";
  import codeClassFunc from "~/components/codeClassFunc";
  export default {
    components: {
      codeClassHtml,
      codeClassFunc
    },
    data() {
      return {
        msg: "sss",
        isInput: false,
        allMsg: [
          {
            name: "ohiYo",
            text: "hello",
            codeClass: "codeClassHtml",
            key: this.newKey()
          },
          {
            name: "baga",
            text: "shishishishi",
            codeClass: "codeClassFunc",
            key: this.newKey()
          }
        ]
      };
    },
    methods: {
      newKey() {
        return new Date().getTime() + "";
      },
      keyHandler(e) {
        if (e.keyCode === 13) {
          this.allMsg.push({
            name: "ohiYo",
            text: this.msg,
            codeClass: "codeClassHtml",
            key: this.newKey()
          });
          this.msg = "";
        }
        // this.$socket.emit("TEST", "棒棒");
      }
    },
    mounted() {
      // document.addEventListener("keyup", this.keyHandler);
    },
    beforeDestroy() {
      // document.removeEventListener("keyup", this.keyHandler);
    }
  };
</script>
<style lang="scss" scoped>
  .msg_input_area {
    border-top: 2px solid #383838;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    > div {
      padding-left: 40px;
    }
    .msg_input {
      padding: 10px;
      display: flex;
      font-size: 12px;
    }
    input {
      background-color: transparent;
      border: 0;
      flex: 1;
      color: #bbbbbb;
      border-bottom: 1px solid #383838;
      &:focus {
        border: 0;
        outline: 0;
        border-bottom: 1px solid #333333;
      }
    }
  }

  .msg_tab {
    > div {
      display: inline-block;
      font-size: 8px;
      color: #717171;
      padding: 5px 8px;
      cursor: pointer;
    }
    > div:hover {
      color: #bbbbbb;
    }
    > div.active {
      color: #bbbbbb;
      border-bottom: 1px solid #6d6d6d;
    }
  }
</style>