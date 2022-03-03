
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    thisGame: 'Organisation Model',
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    modals: {
      'feedback': false
    },
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
    getModals: (state) => {
      return state.modals
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
    showModal: (state, payload) => {
      const modals = Object.keys(state.modals)
      for (let i = 0; i < modals.length; i++) {
        state.modals[modals[i]] = false
      }
      state.modals[payload] = true
    },
    hideModal: (state, payload) => {
      state.modals[payload] = false
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
    showModal: ({ commit }, payload) => {
      commit('showModal', payload)
    },
    hideModal: ({ commit }, payload) => {
      commit('hideModal', payload)
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
