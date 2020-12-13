import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const scenes = {
  WELCOME: 'welcome',
  MAIL: 'mail',
  BRINKS: 'brinks',
  SECRET: 'secret'
}

const store = new Vuex.Store({
  state: {
    currentScene: scenes.WELCOME,
    guestPerson: null
  },
  mutations: {
    nextScene (state) {
      switch (state.currentScene) {
        case scenes.WELCOME:
          state.currentScene = scenes.MAIL
          break;
        case scenes.MAIL:
          state.currentScene = scenes.BRINKS
          break;
        case scenes.BRINKS:
          state.currentScene = scenes.SECRET
          break;
        default:
          break;
      }
    },
    setGuestPerson (state, payload) {
      state.guestPerson = {
        ...payload.guest,
        loggedIn: false
      }
    },
    setLogged (state) {
      state.guestPerson.loggedIn = true
    },
    setHashCode (state, hashCode) {
      state.guestPerson.hashCode = hashCode
    }
  },
  actions: {
    nextScene ({ commit }) {
      commit('nextScene')
    },
    setGuestPerson ({ commit }, payload) {
      commit('setGuestPerson', payload)
    },
    setLogged ({ commit }) {
      commit('setLogged')
    },
    setHashCode ({ commit }, hashCode) {
      commit('setHashCode', hashCode)
    }
  },
  getters: {
    currentScene: (state) => state.currentScene,
    scenes: () => scenes,
    guestPerson: (state) => state.guestPerson
  }
})

export default store