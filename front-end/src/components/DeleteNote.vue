<template>
  <div>
    <button class="delete" @click="deleteNote">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrash);

export default {
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    deleteNote() {
      axios
        .delete(
          `${import.meta.env.VITE_VUE_APP_API_URL}/delete-note/${this.id}`
        )
        .then(() => {
          this.$emit("noteRemoved");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.delete {
  position: absolute;
  top: 10px;
  right: 5px;
}
</style>
