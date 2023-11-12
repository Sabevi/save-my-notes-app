<template>
  <div>
    <h1>Notes</h1>
    <AddNote :note="selectedNote" @noteAdded="fetchNotes" @noteUpdated="fetchNotes" />
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.note }}
        <UpdateNote :id="note.id" @update-note="triggerUpdate" />
        <DeleteNote :id="note.id" @noteRemoved="fetchNotes" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
import { ref, type Ref } from "vue";
import AddNote from "./AddNote.vue";
import DeleteNote from "./DeleteNote.vue";
import UpdateNote from "./UpdateNote.vue";

// see where to put types
type Note = {
  id: number;
  note: string;
};

const note: Ref<Note> = ref({
  id: 0,
  note: "",
});

export default {
  components: {
    AddNote,
    DeleteNote,
    UpdateNote,
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
      this.selectedNote = this.notes.find(note => note.id === id) || null;
    },
  },
  mounted() {
    this.fetchNotes();
  },
};
</script>