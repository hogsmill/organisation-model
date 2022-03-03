<template>
  <div class="check-list">
    <div class="check-list-header">
      <div v-for="(item, index) in checkList" :key="index" class="item-header">
        {{ item.name }}
      </div>
    </div>
    <div v-for="(item, index) in organisation" :key="index" class="item">
      <div class="sub" :style="{'padding-left': item.n * 25 + 'px'}" :class="{'lighter': !item.item.isTeam && !item.item.isMember}">
        <i class="fas fa-user" v-if="item.item.isMember" />
        {{ item.item.name }}
      </div>
      <div v-for="(listItem, lindex) in checkList" :key="lindex" class="list-item">
        <input v-if="item.item.isTeam" type="checkbox" :checked="hasItem(item.item, listItem)" @click="toggleEnableItem(item.item, listItem)">
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
    },
    checkList() {
      return this.$store.getters.getCheckListEnabled
    }
  },
  methods: {
    hasItem(item, listItem) {
      return item.items.find((i) => {
        return i == listItem.id
      })
    },
    toggleEnableItem(item, listItem) {
      const hasItem = !this.hasItem(item, listItem)
      bus.emit('sendToggleHasItem', {id: item.id, item: listItem.id, hasItem: hasItem})
    }
  }
}
</script>

<style lang="scss">
  .check-list {
    text-align: left;
    margin: 0 24px 0 24px;

    .item-header {
      display: inline-block;
      width: 100px;
      text-align: center;
    }

    .check-list-header {
      margin-left: 300px;
    }

    .item {
      height: 28px;
      border-bottom: 1px solid #888;

      .lighter {
        color: #ccc;
      }

      .sub {
        width: 300px;
        display: inline-block;
      }

      .list-item {
        display: inline-block;
        width: 100px;
        text-align: center;

        .fa-check {
          color: green;
        }
      }

      .fa-user {
        color: #888;
      }
    }
  }
</style>
