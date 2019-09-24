export const state = () => ({
  loginData: {
    memberName: null,
    memberId: null
  },
  channels: {
    now: null,
    list: []
  }
  // {
  //   name: '',
  // channelId: '',
  //   password: '',
  // msg: []
  // }
})

export const mutations = {
  SET_LOGIN: (state, data) => {
    state.loginData.memberName = data.memberName
    state.loginData.memberId = data.memberId
  },
  SET_CHANNEL: (state, data) => {
    state.channels.list.push(data)
    if (!state.channels.now) {
      state.channels.now = data
    }
  },
  SET_NOW_CHANNE: (state, data) => {
    state.channels.now = data
  }
}
export const actions = {
  SET_LOGIN_DATA({ commit }, data) {
    console.log('actions', data)
    commit('SET_LOGIN', data)
  }
}
