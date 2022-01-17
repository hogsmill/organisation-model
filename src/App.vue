<template>
  <div id="app">
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <h1>App Testbed</h1>
    <div class="buttons">
      <i class="fas fa-envelope-open-text" :class="{'selected': tab == 'messaging'}" @click="setTab('messaging')" title="Message/socket testing" />
      <i class="fas fa-chart-line" :class="{'selected': tab == 'graph'}" @click="setTab('graph')" title="Graph testing" />
      <i class="fas fa-qrcode" :class="{'selected': tab == 'qrcode'}" @click="setTab('qrcode')" title="QR Code testing" />
      <i class="fas fa-window-maximize" :class="{'selected': tab == 'modal'}" @click="setTab('modal')" title="Modal Test" />
    </div>
    <Messaging v-if="tab == 'messaging'" />
    <Graph v-if="tab == 'graph'" />
    <QrCode v-if="tab == 'qrcode'" />
    <Modal v-if="tab == 'modal'"  />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

import Messaging from './components/Messaging.vue'
import Graph from './components/Graph.vue'
import QrCode from './components/QrCode.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Messaging,
    Graph,
    QrCode,
    Modal
  },
  data() {
    return {
      tab: '',
      option: '',
      options: [],
      opts: {
        'first': ['one', 'two', 'three'],
        'second': ['a', 'b', 'c']
      }
    }
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())

    bus.$on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.$on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })
  },
  methods: {
    setTab(tab) {
      this.tab = tab
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
      border: 1px solid;
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
