<template>
  <textarea v-model="note.content"></textarea>
  <br />
  <button @click="submit">Create new note</button>
</template>

<script setup lang="ts">
import axios from "redaxios";
import { ref, type Ref } from 'vue';

// see where to put types
type Note = {
  content: string;
};

const note: Ref<Note>  = ref({
  content: '',
});

async function submit() {
  try {
    const response = await axios.post("http://localhost:3000/api/note/add-note", {
      note: note.value.content,
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }

  note.value.content = '';
};
</script>

<style></style>
