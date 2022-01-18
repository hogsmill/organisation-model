import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    thisGame: 'Organisation Model',
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    tab: 'display',
    organisationId: ''
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
    getOrganisationId: (state) => {
      return state.organisationId
    },
    getOrganisation: (state) => {
      return state.organisation
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
    setOrganisationId: (state, payload) => {
      state.organisationId = payload
    },
    updateOrganisation: (state, payload) => {
      state.organisation = payload
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
    setOrganisationId: ({ commit }, payload) => {
      commit('setOrganisationId', payload)
    },
    updateOrganisation: ({ commit }, payload) => {
      commit('updateOrganisation', payload)
    }
  }
})
