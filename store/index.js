import Vue from 'vue'
export const state = () => ({
  loginData: {
    memberName: null,
    memberId: null
  },
  channels: {
    now: null,
    list: {}
  }
  // {
  //   name: '',
  // channelId: '',
  //   password: '',
  //   members: [],
  // msg: []
  // }
})

export const mutations = {
  SET_LOGIN: (state, data) => {
    state.loginData.memberName = data.memberName
    state.loginData.memberId = data.memberId
  },
  SET_CHANNEL: (state, data) => {
    Vue.set(state.channels.list, data.channelId, data)
    console.log(data)
    if (!state.channels.now) {
      state.channels.now = data
    }
  },
  SET_NOW_CHANNE: (state, data) => {
    state.channels.now = data
  },
  SET_NEW_MSG: (state, data) => {
    console.log('SET_NEW_MSG', data)
    // if (!state.channels.list[data.channelId]) return false
    state.channels.list[data.channel.channelId].msg.push(data.msg)
  },
  INVITE_MEMBER: (state, data) => {
    console.log('INVITE_MEMBER', data)

    state.channels.list[data.channel.channelId].members.push(data.member)
    state.channels.now = data.channel
  }
}
export const actions = {
  SET_LOGIN_DATA({ commit }, data) {
    console.log('SET_LOGIN_DATA')
    commit('SET_LOGIN', data)
  }
}
