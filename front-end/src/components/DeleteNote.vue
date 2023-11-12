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
        .delete(`http://localhost:3000/api/note/delete-note/${this.id}`)
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