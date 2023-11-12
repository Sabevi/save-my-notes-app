<template>
  <div>
    <textarea v-model="newNote" type="text" />
    <button @click="addNote">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
import { watchEffect } from "vue";

type Note = {
  id: number;
  note: string;
};

export default {
  props: {
    note: {
      type: Object as () => Note | null,
      default: null,
    },
  },
  data() {
    return {
      newNote: "",
    };
  },
  computed: {
    buttonText() {
      return this.note ? "Update Note" : "Add Note";
    },
  },
  methods: {
    addNote() {
    if (this.note) {
      // Update existing note
      axios
        .put("http://localhost:3000/api/note/update-note", {
          id: this.note.id,
          note: this.newNote,
        })
        .then(() => {
          this.newNote = "";
          this.$emit("noteUpdated");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Add new note
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
    }
  },
  },
  mounted() {
    watchEffect(() => {
      if (this.note) {
        this.newNote = this.note.note;
      }
    });
  },
};
</script>
