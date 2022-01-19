<template>
  <div>
    <div>
      <input id="new-list-item">
      <button @click="addNew()">
        Add New
      </button>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  methods: {
    addNew() {
    
    }
  }
}
