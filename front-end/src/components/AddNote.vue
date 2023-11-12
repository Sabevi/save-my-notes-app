<template>
  <div>
    <input v-model="newNote" type="text" />
    <button @click="addNote">Add Note</button>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";

export default {
  data() {
    return {
      newNote: "",
    };
  },
  methods: {
    addNote() {
      axios
        .post("http://localhost:3000/api/note/add-note", {
          note: this.newNote,
        })
        .then(() => {
          this.newNote = "";
          this.$emit("noteAdded");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
