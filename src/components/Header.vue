<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-4">
    <a class="navbar-brand" href="https://agilesimulations.co.uk">
      <img src="/lego.png" class="ml-4" height="38px">
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <h1>
        Organisation Model
      </h1>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" :class="{ active: tab == 'checkList' }">
          <a class="nav-link pointer" @click="setTab('checkList')">Check List</a>
        </li>
        <li class="nav-item" :class="{ active: tab == 'admin' }">
          <a class="nav-link pointer" @click="setTab('admin')">Admin</a>
        </li>
        <li class="nav-item">
          <a class="nav-link pointer" @click="show()">Feedback</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    thisGame() {
      return this.$store.getters.thisGame
    },
    showAbout() {
      return this.$store.getters.getShowAbout
    },
    tab() {
      return this.$store.getters.getTab
    }
  },
  created() {
    if (location.search == '?host') {
      this.$store.dispatch('updateHost', true)
    }
    this.appName = process.env.VUE_APP_NAME
  },
  methods: {
    setTab(tab) {
      this.$store.dispatch('setTab', tab)
    },
    show () {
      this.$store.dispatch('showModal', 'feedback')
    }
  }
}
</script>

<style lang="scss">
  nav {
    h1 {
      letter-spacing: initial;
      margin-left: 6px;
      font-weight: bold;
      text-shadow: 2px 2px 3px #444;
      font-size: xx-large;
      line-height: 1;
    }
  }
</style>
