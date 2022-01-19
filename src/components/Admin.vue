<template>
  <div>
    <div class="admin">
      <div class="admin-header">
        <i v-if="showOrganisation" @click="setShowOrganisation(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showOrganisation" @click="setShowOrganisation(true)" title="expand" class="fas fa-caret-down toggle" />
      </div>
      <h5>
        Organisation
      </h5>
      <Organisation v-if="showOrganisation" />
    </div>
    <div class="admin">
      <div class="admin-header">
        <i v-if="showCheckList" @click="setShowCheckList(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showCheckList" @click="setShowCheckList(true)" title="expand" class="fas fa-caret-down toggle" />
      </div>
      <h5>
        CheckList
      </h5>
      <CheckList v-if="showCheckList" />
    </div>
  </div>
</template>

<script>
import Organisation from './admin/Organisation.vue'
import CheckList from './admin/CheckList.vue'

export default {
  components: {
    Organisation,
    CheckList
  },
  data() {
    return {
      showOrganisation: false,
      showCheckList: false
    }
  },
  methods: {
    setShowOrganisation(val) {
      this.showOrganisation = val
    },
    setShowCheckList(val) {
      this.showCheckList = val
    }
  }
}
</script>

<style lang="scss">
  .admin {
    width: 90%;
    max-width: 600px;
    margin: 24px auto;
    border: 1px solid #888;;

    .admin-header {
      .fas {
        float: right;
        margin-right: 6px;
        font-size: xx-large;
        color: #888;
      }
    }

    .fas {
      &:hover {
        cursor: pointer;
        color: #444;
      }
    }

    th, td {
      padding: 3px;
    }

    .left {
      text-align: left;
    }
  }
</style>
