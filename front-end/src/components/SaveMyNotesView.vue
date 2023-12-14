<template>
  <formattedNote> Save My Notes </formattedNote>
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

<style scoped>
formattedNote {
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding-top: 30px;
  margin-bottom: 30px;

  @media(max-width: 750px) {
    font-size: 30px;
    padding-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
```
