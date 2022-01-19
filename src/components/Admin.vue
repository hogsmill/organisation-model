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
        <i v-if="showChecklist" @click="setShowChecklist(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showChecklist" @click="setShowChecklist(true)" title="expand" class="fas fa-caret-down toggle" />
      </div>
      <h5>
        Checklist
      </h5>
      <CheckList v-if="showChecklist" />
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
      showChecklist: false
    }
  },
  methods: {
    setShowOrganisation(val) {
      this.showOrganisation = val
    },
    setShowChecklist(val) {
      this.showChecklist = val
    }
  }
}
</script>

<style lang="scss">
  .admin {
    width: 90%;
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
  }
</style>
