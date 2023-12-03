<template>
  <div>
    <label for="noteInput" class="sr-only">Note to Update </label>
    <textarea id="noteInput" v-model="newNote" type="text" />
    <button @click="addNote">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";

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
      noteUpdated: null as Note | null,
    };
  },
  watch: {
    note: {
      immediate: true,
      handler(newValue) {
        this.noteUpdated = newValue;
        if (newValue) {
          this.newNote = newValue.note;
        } else {
          this.newNote = "";
        }
      },
    },
  },
  computed: {
    buttonText() {
      return this.noteUpdated ? "Update Note" : "Add Note";
    },
  },
  methods: {
    addNote() {
      if (this.noteUpdated) {
        // Update existing note
        axios
          .put(`${import.meta.env.VITE_VUE_APP_API_URL}/update-note`, {
            id: this.noteUpdated.id,
            note: this.newNote,
          })
          .then(() => {
            this.newNote = "";
            this.noteUpdated = null;
            this.$emit("noteUpdated");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Add new note
        axios
          .post(`${import.meta.env.VITE_VUE_APP_API_URL}/add-note`, {
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
