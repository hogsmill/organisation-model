<template>
  <div class="org">
    <div v-for="(item, index) in organisation" :key="index">
      <div v-for="(n, i) in item.n" :key="i" class="spacer sub" />
      <div v-if="editingName != item.item.id" class="item sub">
        <i v-if="item.item.children.length" class="fas fa-trash-alt disabled" title="Cannot Delete" @click="cannotDeleteItem(item.item)" />
        <i v-if="!item.item.children.length" class="fas fa-trash-alt" title="Delete" @click="deleteItem(item.item)" />
        <i class="fas fa-plus-square" title="Add Child" @click="addChild(item.item.id)" />
        <input type="checkbox" :checked="item.item.isTeam" @click="toggleEnableIsTeam(item.item)">
        {{ item.item.name }}
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
      editingName: ''
    }
  },
  computed: {
    organisation() {
      return this.$store.getters.getOrganisation
    }
  },
  methods: {
    cannotDeleteItem(item) {
      alert('Cannot delete ' + item.name + ' as it has children')
    },
    deleteItem(item) {
      if (confirm('Delete ' + item.name + '?')) {
        bus.$emit('sendDeleteItem', item)
      }
    },
    addChild(id) {
      bus.$emit('sendAddItem', {parent: id, name: 'New Item'})
    },
    editName(id) {
      this.editingName = id
    },
    saveName(id) {
      const itemName = document.getElementById('editing-name-' + id).value
      bus.$emit('sendSaveItemName', {id: id, name: itemName})
      this.editingName = ''
    },
    toggleEnableIsTeam(item) {
      const isTeam = !item.isTeam
      bus.$emit('sendToggleItemIsTeam', {id: item.id, isTeam: isTeam})
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
    }

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
