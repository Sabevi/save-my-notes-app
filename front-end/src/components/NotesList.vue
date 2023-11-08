<template>
  <div>
    <h1>Notes</h1>
    <ul>
      <li v-for="note in notes" :key="note.id">{{ note.note }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
import { ref, type Ref } from 'vue';

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
  data() {
    return {
      notes: [] as Note[],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/note")
      .then((response) => {
        this.notes = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>
