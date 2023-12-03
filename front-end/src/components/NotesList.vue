<template>
  <ul>
    <li v-for="note in notes" :key="note.id">
      {{ note.note }}
      <UpdateNote :id="note.id" @update-note="$emit('update-note', note.id)" />
      <DeleteNote :id="note.id" @noteRemoved="$emit('noteRemoved')" />
    </li>
  </ul>
</template>

<script lang="ts">
import DeleteNote from "./DeleteNote.vue";
import UpdateNote from "./UpdateNote.vue";

interface Note {
  id: number;
  note: string;
}

export default {
  props: {
    notes: {
      type: Array as () => Note[],
      required: true,
    },
  },
  components: {
    DeleteNote,
    UpdateNote,
  },
};
</script>