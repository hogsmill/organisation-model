<template>
  <div>
    Define {{ organisationId }}
  </div>
</template>

<script>
export default {
  computed: {
    organisationId() {
      return this.$store.getters.getOrganisationId
    }
  }
}
</script>
