<template>
  <div class="org">
    <div v-for="(item, index) in organisation" :key="index">
      <div v-for="(n, i) in item.n" :key="i" class="spacer sub" />
      <div class="actions sub">
        <i v-if="item.item.children.length" class="fas fa-trash-alt disabled" title="Cannot Delete" @click="cannotDeleteItem(item.item)" />
        <i v-if="!item.item.children.length" class="fas fa-trash-alt" title="Delete" @click="deleteItem(item.item)" />
        <i class="fas fa-sitemap" title="Move item" @click="moveItem(item.item.id)" />
        <i class="fas fa-plus-square" v-if="!item.item.isMember" title="Add Child" @click="addChild(item.item.id, false)" />
        <i class="fas fa-users" v-if="!item.item.isMember" :class="{ 'selected': item.item.isTeam }" :title="isTeamLabel(item.item)" @click="toggleEnableItemAttribute(item.item, 'isTeam')" />
        <i class="fas fa-user-plus" v-if="item.item.isTeam" title="Add Member" @click="addChild(item.item.id, true)" />
        <i class="fas fa-user-tie" v-if="item.item.isMember" :class="{ 'selected': item.item.isLead }" :title="isLeadLabel(item.item)" @click="toggleEnableItemAttribute(item.item, 'isLead')" />
      </div>
      <div v-if="editingName != item.item.id" class="item sub">
        <span v-if="moving && moving != item.item.id" @click="moveItemTarget(item.item.id)" class="moving">{{ item.item.name }}</span>
        <span v-if="!moving || moving == item.item.id">{{ item.item.name }}</span>
        <i class="fas fa-edit" title="Edit Item Name" @click="editName(item.item.id)" />
      </div>
      <div v-if="editingName == item.item.id" class="item sub">
        <input :id="'editing-name-' + item.item.id" :value="item.item.name">
        <i class="fas fa-save" title="Save Item Name" @click="saveName(item.item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      editingName: '',
      moving: false,
      moveItemDone: {}
    }
  },
  computed: {
    organisation() {
      return this.$store.getters.getOrganisation
    }
  },
  created() {
    bus.$on('moveItemDone', (done) => {
      this.moveItemDone[done] = true
      console.log(done, this.moveItemDone)
      if (this.moveItemComplete()) {
        this.moveItemDone = {}
        bus.$emit('sendUpdateOrganisation')
      }
    })
  },
  methods: {
    isTeamLabel(item) {
      return item.isTeam ? item.name + ' is a team' : item.name + ' is not a team'
    },
    isLeadLabel(item) {
      return item.isLead ? item.name + ' is a team leader/manager' : item.name + ' is not a team leader/manager'
    },
    moveItemComplete() {
      return this.moveItemDone.item && this.moveItemDone.oldParent && this.moveItemDone.newParent
    },
    findFromId(id) {
      return this.organisation.find((i) => {
        return i.item.id == id
      }).item
    },
    cannotDeleteItem(item) {
      alert('Cannot delete ' + item.name + ' as it has children')
    },
    deleteItem(item) {
      if (confirm('Delete ' + item.name + '?')) {
        bus.$emit('sendDeleteItem', item)
      }
    },
    moveItem(id) {
      this.moving = id
      const item = this.findFromId(id)
      alert('Click on the node you want "' + item.name + '" to be a child of')
    },
    moveItemTarget(id) {
      const item = this.findFromId(this.moving)
      const target = this.findFromId(id)
      if (confirm('Move "' + item.name + '" under "' + target.name + '"')) {
        this.moveItemDone = {}
        bus.$emit('sendMoveItem', {item: item, target: target})
      }
      this.moving = ''
    },
    addChild(id, member) {
      const label = member ? 'New Member' : 'New Item'
      bus.$emit('sendAddItem', {parent: id, name: label, member: member})
    },
    editName(id) {
      this.editingName = id
    },
    saveName(id) {
      const itemName = document.getElementById('editing-name-' + id).value
      bus.$emit('sendSaveItemName', {id: id, name: itemName})
      this.editingName = ''
    },
    toggleEnableItemAttribute(item, attribute) {
      const val = !item[attribute]
      bus.$emit('sendToggleItemAttribute', {id: item.id, attribute: attribute, value: val})
    }
  }
}
</script>

<style lang="scss">
  .org {
    text-align: left;
    margin: 0 auto;
    padding: 12px;

    .fas {
      margin: 3px;
      color: #888;

      &.disabled {
        color: #ddd;
      }
    }

    .actions {
      input {
        margin: 0 3px;
        position: relative;
        top: 1px;
      }
    }

    .moving {
      border: 1px solid green;
      color: green;
      &:hover {
        color: #fff;
        background-color: green;
      }
    }
    .sub {
      display: inline-block;

      .selected {
        color: green;
      }

      span {
        padding: 2px;
      }

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
