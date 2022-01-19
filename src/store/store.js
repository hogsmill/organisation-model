import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    thisGame: 'Organisation Model',
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    tab: 'checkList',
    organisation: [],
    checkList: []
  },
  getters: {
    thisGame: (state) => {
      return state.thisGame
    },
    getConnections: (state) => {
      return state.connections
    },
    getConnectionError: (state) => {
      return state.connectionError
    },
    getLocalStorageStatus: (state) => {
      return state.localStorageStatus
    },
    getTab: (state) => {
      return state.tab
    },
    getOrganisation: (state) => {
      return state.organisation
    },
    getCheckList: (state) => {
      return state.checkList
    },
    getCheckListEnabled: (state) => {
      const items = []
      for (let i = 0; i < state.checkList.length; i++) {
        if (state.checkList[i].enabled) {
          items.push(state.checkList[i])
        }
      }
      return items
    }
  },
  mutations: {
    updateConnections: (state, payload) => {
      state.connections = payload
    },
    updateConnectionError: (state, payload) => {
      state.connectionError = payload
    },
    localStorageStatus: (state, payload) => {
      state.localStorageStatus = payload
    },
    setTab: (state, payload) => {
      state.tab = payload
    },
    updateOrganisation: (state, payload) => {
      state.organisation = payload
    },
    updateCheckList: (state, payload) => {
      state.checkList = payload
    }
  },
  actions: {
    updateConnections: ({ commit }, payload) => {
      commit('updateConnections', payload)
    },
    updateConnectionError: ({ commit }, payload) => {
      commit('updateConnectionError', payload)
    },
    localStorageStatus: ({ commit }, payload) => {
      commit('localStorageStatus', payload)
    },
    setTab: ({ commit }, payload) => {
      commit('setTab', payload)
    },
    updateOrganisation: ({ commit }, payload) => {
      commit('updateOrganisation', payload)
    },
    updateCheckList: ({ commit }, payload) => {
      commit('updateCheckList', payload)
    }
  }
})
