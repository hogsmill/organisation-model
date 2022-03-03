<template>
  <div id="app">
    <Header />
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <h1>{{ organisation() }}</h1>
    <CheckList v-if="tab == 'checkList'" />
    <Admin v-if="tab == 'admin'" />
    <Modals />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

import Header from './components/Header.vue'
import Modals from './components/Modals.vue'
import CheckList from './components/CheckList.vue'
import Admin from './components/Admin.vue'

export default {
  name: 'App',
  components: {
    Header,
    Modals,
    CheckList,
    Admin
  },
  data() {
    return {
    }
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    },
    tab() {
      return this.$store.getters.getTab
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())

    bus.on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })

    bus.emit('sendCheckOrganisation', this.organisation())

    bus.on('updateOrganisation', (data) => {
      this.$store.dispatch('updateOrganisation', data)
    })

    bus.on('updateCheckList', (data) => {
      this.$store.dispatch('updateCheckList', data)
    })
  },
  methods: {
    organisation() {
      return process.env.VUE_APP_ORGANISATION ? process.env.VUE_APP_ORGANISATION : 'Agile Simulations'
    }
  }
}
</script>

<style lang="scss">

  h1 {
    margin-top: 24px;
  }

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }

  .buttons {
    margin-bottom: 24px;

    .fas {
      padding: 6px;
      margin: 6px;
      border-radius: 6px;
      color: #f4511e;

      &.selected {
        color: #fff;
        background-color: #f4511e;
      }
    }
  }

  table {
    margin: 0 auto;

    td {
      padding: 6px;
    }
  }
</style>
