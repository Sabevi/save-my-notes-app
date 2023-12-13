<template>
  <div>
    <label for="noteInput" class="sr-only">Note to Add or Update </label>
    <textarea
      id="noteInput"
      v-model="newNote"
      @input="splitNoteIntoLines"
      type="text"
      maxlength="650"
      @keydown="preventExcessLines"
      placeholder="Add your note here..."
    />
    <button class="addOrUpdate" @click="addNote" :aria-label="buttonText">
      {{ buttonText }}<font-awesome-icon :icon="['fas', 'check']" />
    </button>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { Note } from "../types";

library.add(faCheck);

const MAX_LINES = 20;

export default {
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    note: {
      type: Object as () => Note | null,
      default: null,
    },
  },
  data() {
    return {
      newNote: "",
      noteUpdated: null as Note | null,
      // note saved in array where each line is a separate item
      formattedNote: [] as string[],
    };
  },
  watch: {
    note: {
      immediate: true,
      handler(newValue) {
        this.noteUpdated = newValue;
        if (newValue) {
          this.newNote = this.formatNoteForUpdate(newValue.note).join("\n");
          this.splitNoteIntoLines();
        } else {
          this.newNote = "";
          this.formattedNote = [];
        }
      },
    },
  },
  computed: {
    buttonText() {
      return this.noteUpdated ? "Update Note" : "Add Note";
    },
  },
  methods: {
    preventExcessLines(event: KeyboardEvent) {
      const lines = this.newNote.split("\n");
      if (lines.length >= MAX_LINES && event.key === "Enter") {
        event.preventDefault();
      }
    },
    splitNoteIntoLines() {
      const lines = this.newNote.split("\n");
      const processedLines = lines.map((line) => {
        if (line.trim() === "") {
          return "";
          // if line starts with a "-" replace it with a bullet point "•"
        } else if (line.trim().startsWith("-")) {
          return `• ${line.substring(1)}`;
        } else {
          return `${line}`;
        }
      });
      this.formattedNote = processedLines;
    },
    formatNoteForUpdate(note: string) {
      return note
        .replace(/\\"/g, "")
        .replace(/[\[\]"]/g, "")
        .replace(/"/g, "")
        .split(",");
    },
    addNote() {
      const note = this.formattedNote.join(",");
      if (this.noteUpdated) {
        // Update existing note
        axios
          .put(`${import.meta.env.VITE_VUE_APP_API_URL}/update-note`, {
            id: this.noteUpdated.id,
            note: note,
          })
          .then(() => {
            this.newNote = "";
            this.noteUpdated = null;
            this.formattedNote = [];
            this.$emit("noteUpdated");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Add new note
        axios
          .post(`${import.meta.env.VITE_VUE_APP_API_URL}/add-note`, {
            note: note,
          })
          .then(() => {
            this.newNote = "";
            this.formattedNote = [];
            this.$emit("noteAdded");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
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
  overflow: hidden;
  border: 0;
}

textarea,
button {
  display: block;
  margin: 0 auto;
}

textarea {
  max-width: 700px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  font-style: italic;
  font-size: 14px;
  padding: 20px;

  @media (max-width: 750px) {
    max-width: 550px;
  }

  @media (max-width: 650px) {
    max-width: 400px;
  }

  @media (max-width: 450px) {
    max-width: 350px;
  }

  @media (max-width: 400px) {
    max-width: 280px;
  }
}

textarea:focus {
  outline: none;
  border: 2px solid rgb(144, 118, 236);
}
.addOrUpdate {
  border: 2px solid white;
  border-radius: 10px;
  padding: 5px 15px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 20px auto 0;

  @media (max-width: 750px) {
    font-size: 15px;
  }
}
.addOrUpdate .svg-inline--fa {
  margin-left: 10px;
}
</style>
