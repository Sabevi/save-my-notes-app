<template>
    <div>
      <button @click="triggerUpdate">Update</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
    id: {
      type: Number,
      required: true,
    },
  },
    methods: {
      triggerUpdate() {
        this.$emit('update-note', this.id);
      },
    },
  };
  </script>