<template>
  <div>
    <button @click="deleteNote">X</button>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    deleteNote() {
      axios
        .delete(`${import.meta.env.VITE_VUE_APP_API_URL}/delete-note/${this.id}`)
        .then(() => {
          this.$emit('noteRemoved');
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>