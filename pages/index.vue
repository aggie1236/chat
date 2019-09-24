<template>
  <div class="welcome">
    <div class="chat_content">
      <h1>Welcome</h1>
      <h2>Hello Wrold!</h2>
    </div>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <div class="msg_input_area">
      <div>
        <div class="msg_tab">
          <div>PROBLEMS</div>
          <div>OUTPUT</div>
          <div>DEBUG CONSOLE</div>
          <div class="active">TERMINAL</div>
        </div>
        <div class="commment">
          <p>input your name</p>
        </div>
        <div class="msg_input">
          user:project $
          <input type="text" v-model="memberName" @keyup.enter="keyHandler" />
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  components: {
  },
  
  data(){
    return{
        memberName: "",
    }
  },
  methods:{
    keyHandler() {
      let memberData = {
        memberName: this.memberName,
        memberId: this.createKey()
      }
      this.$socket.emit("login", memberData);
      this.$store.dispatch('SET_LOGIN_DATA', memberData)
      this.memberName = "";
      this.$router.push('/chat')
    },
    createKey(){
      return new Date().getTime() + ""
    }
  },
  mounted() {
      // this.$socket.on("uploadMsg", this.uploadMsg);
    },
    beforeDestroy() {
      // this.$socket.off("uploadMsg");
    }
}
</script>
