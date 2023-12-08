<template>
  <div class="cards">
    <div class="card" v-for="note in notes" :key="note.id">
      {{ note.note }}
      <UpdateNote :id="note.id" @update-note="$emit('update-note', note.id)" />
      <DeleteNote :id="note.id" @noteRemoved="$emit('noteRemoved')" />
    </div>
  </div>

</template>

<script lang="ts">
import DeleteNote from "./DeleteNote.vue";
import UpdateNote from "./UpdateNote.vue";
import type { Note } from "../types";

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

<style scoped>
.cards {
    display: grid;
    grid-column: 2/12;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    padding-top: 40px;
    border: 2px solid blue;
    
    @media(max-width: 1500px) {
        grid-template-columns: repeat(3, 1fr);
        padding: 40px;
    }

    @media(max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 80px;
    }

    @media(max-width: 1000px) {
        padding: 40px;
    }

    @media(max-width: 620px) {
        grid-template-columns: repeat(1, 1fr);
        padding: 80px;
    }

    @media(max-width: 420px) {
        grid-template-columns: repeat(1, 1fr);
        padding: 20px;
    }
}

.card {
  border-top: solid 40px darken(#FFF9C4, 10%);
	background: #FFF9C4;
	min-height: 200px;
  min-width: 280px;
	box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
	padding: 10px 20px;
	font-family: 'Indie Flower', cursive;
	font-size: 14px;

  @media(max-width: 1000px) {
    min-height: 150px;
    min-width: 250px;
    }
}
</style>