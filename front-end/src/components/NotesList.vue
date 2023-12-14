<template>
  <div class="cards">
    <div class="card" v-for="note in notes" :key="note.id">
      <p
        v-for="(line, index) in formattedNote(note.note)"
        :key="index"
        v-html="line === '' ? '<br>' : line"
      ></p>
      <UpdateNote :id="note.id" @update-note="$emit('update-note', note.id)" />
      <DeleteNote :id="note.id" @noteRemoved="$emit('noteRemoved')" />
    </div>
  </div>
</template>

<script lang="ts">
import DeleteNote from "./DeleteNote.vue";
import UpdateNote from "./UpdateNote.vue";
import type { PropType } from "vue";
import type { Note } from "../types";

export default {
  props: {
    notes: {
      type: Array as PropType<Note[]>,
      required: true,
    },
  },
  components: {
    DeleteNote,
    UpdateNote,
  },
  methods: {
    formattedNote(note: string) {
      console.log(note);
      return note
        .replace(/^-/gm, "• ")
        .split("\n");
    },
  }
};
</script>

<style scoped>
.cards {
  max-width: 1440px;
  margin: auto;
  display: grid;
  grid-column: 2/12;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  padding: 40px 0;

  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 80px;
  }

  @media (max-width: 1000px) {
    padding: 40px;
  }

  @media (max-width: 620px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: 420px) {
    padding: 20px;
  }
}

.card {
  border-top: solid 40px darken(#fff9c4, 10%);
  background: #fff9c4;
  min-height: 200px;
  min-width: 280px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 40px 20px 20px 20px;
  font-style: italic;
  font-size: 14px;
  position: relative;

  @media (max-width: 1000px) {
    min-height: 150px;
    min-width: 250px;
    font-size: 12px;
  }

  p {
    min-height: 10px;
  }
}
</style>
