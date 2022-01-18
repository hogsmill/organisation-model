<template>
  <div>
    <div v-for="(item, index) in org" :key="index">
      <div class="spacer" :width="item.width + 'px'" />
      <div class="item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    organisation() {
      return this.$store.getters.getOrganisation
    }
  },
  methods: {
    org() {
    
    }
  }
}
</script>
