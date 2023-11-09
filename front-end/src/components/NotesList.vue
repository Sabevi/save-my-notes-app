<template>
  <div>
    <h1>Notes</h1>
    <AddNote @noteAdded="fetchNotes" />
    <ul>
      <li v-for="note in notes" :key="note.id">{{ note.note }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
import { ref, type Ref } from 'vue';
import AddNote from './AddNote.vue'; // Import the AddNote component

// see where to put types
type Note = {
  id: string;
  note: string;
};

const note: Ref<Note> = ref({
  id: '',
  note: '',
});

export default {
  components: {
    AddNote, // Register the AddNote component
  },
  data() {
    return {
      notes: [] as Note[],
    };
  },
  methods: {
    fetchNotes() {
      axios
        .get("http://localhost:3000/api/note")
        .then((response) => {
          this.notes = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.fetchNotes();
  },
};
</script>