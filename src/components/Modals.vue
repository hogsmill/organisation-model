<template>
  <div>
    <Feedback v-if="modals['feedback']" />
  </div>
</template>

<script>
import Feedback from './modals/Feedback.vue'

export default {
  components: {
    Feedback
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    }
  }
}
</script>

<style lang="scss">

  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    width: 90%;
    max-width: 850px;
  }
  .modal__title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal-content {
    letter-spacing: 0;
    color: #212529;

    p.modal-form {
      margin: o auto;
      margin-bottom: 12px;
    }

    .modal-form {
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
