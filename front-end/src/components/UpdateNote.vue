<template>
  <div>
    <button class="update" @click="triggerUpdate" aria-label="update note">
      <font-awesome-icon :icon="['fass', 'pen-to-square']" />
    </button>
  </div>
</template>

<script lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPenToSquare);

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
    triggerUpdate() {
      this.$emit("update-note", this.id);
    },
  },
};
</script>

<style scoped>
.update {
  position: absolute;
  top: 10px;
  right: 25px;
}
.update .svg-inline--fa {
  color: rgb(55, 141, 167);
}
</style>
