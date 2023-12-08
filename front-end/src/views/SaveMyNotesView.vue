<template>
  <h1>Notes</h1>
  <AddNote
    :note="selectedNote"
    @noteAdded="fetchNotes"
    @noteUpdated="fetchNotes"
  />
  <NotesList
    :notes="notes"
    @update-note="triggerUpdate"
    @noteRemoved="fetchNotes"
  />
</template>

<script lang="ts">
import axios from "redaxios";
import { ref, type Ref } from "vue";
import AddNote from "../components/AddNote.vue";
import NotesList from "../components/NotesList.vue";
import type { Note } from "../types";

const note: Note = {
  id: 0,
  note: "",
};

export default {
  components: {
    AddNote,
    NotesList,
  },
  data() {
    return {
      notes: [] as Note[],
      selectedNote: null as Note | null,
    };
  },
  methods: {
    fetchNotes() {
      axios
        .get(`${import.meta.env.VITE_VUE_APP_API_URL}`)
        .then((response) => {
          this.notes = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    triggerUpdate(id: number) {
      this.selectedNote = this.notes.find((note) => note.id === id) || null;
    },
  },
  mounted() {
    this.fetchNotes();
  },
};
</script>
```
