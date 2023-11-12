<template>
  <div>
    <h1>Notes</h1>
    <AddNote @noteAdded="fetchNotes" />
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.note }}
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
