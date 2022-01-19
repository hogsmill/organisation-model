<template>
  <div class="admin-check-list">
    <div>
      <input id="new-list-item">
      <button class="btn btn-sm btn-secondary smaller-font" @click="addNew()">
        Add New
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            Actions
          </th>
          <th>
            Enabled
          </th>
          <th>
            Item
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in checkList" :key="index">
          <td>
            <i class="fas fa-trash-alt" title="Delete" @click="deleteItem(item.id)" />
            <i v-if="editingItem != item.id" class="fas fa-edit" title="Edit Item Name" @click="editName(item.id)" />
            <i v-if="editingItem == item.id" class="fas fa-save" title="Save Item Name" @click="saveName(item.id)" />
          </td>
          <td>
            <input type="checkbox" @click="toggleEnableItem(item)" :checked="item.enabled">
          </td>
          <td class="left">
            <div class="editor">
              <span v-if="editingItem != item.id" class="list-item">
                {{ item.name }}
              </span>
              <input v-if="editingItem == item.id" :id="'list-item-' + item.id" :value="item.name">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      editingItem: ''
    }
  },
  computed: {
    checkList() {
      return this.$store.getters.getCheckList
    }
  },
  methods: {
    addNew() {
      const item = document.getElementById('new-list-item').value
      bus.$emit('sendAddCheckListItem', item)
    },
    editName(id) {
      this.editingItem = id
    },
    saveName(id) {
      const name = document.getElementById('list-item-' + id).value
      bus.$emit('sendSaveCheckListItemName', {id: id, name: name})
      this.editingItem = ''
    },
    toggleEnableItem(item) {
      const enabled = !item.enabled
      bus.$emit('sendToggleEnableListItem', {id: item.id, enabled: enabled})
    }
  }
}
</script>

<style lang="scss">
  .admin-check-list {

    button {
      margin-top: 0px;
    }

    .fas {
      margin: 3px;
      color: #888;

      &.fa-save {
        padding: 2px;
      }
    }

    .editor {
      width: 200px;
      height: 30px;
    }
  }
</style>
