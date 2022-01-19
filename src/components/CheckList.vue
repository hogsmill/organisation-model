<template>
  <div class="check-list">
    <div v-for="(item, index) in organisation" :key="index">
      <div v-for="(n, i) in item.n" :key="i" class="spacer sub" />
      <div class="item sub">
        {{ item.item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    organisation() {
      return this.$store.getters.getOrganisation
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .check-list {
    width: 50%;
    text-align: left;
    margin: 0 auto;

    .sub {
      display: inline-block;

      &.spacer {
        width: 50px;
      }

      &.item {
        width: 300px;
        height: 28px;
      }
    }
  }
</style>
