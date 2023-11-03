<template>
  <div>
    <h1> Notes </h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "redaxios";
export default {
  data() {
    return {
      title: "",
      items: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/note")
      .then((response) => {
        console.log(response.data);
        this.title = response.data.title;
        this.items = response.data.items;
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
      });
  },
};
</script>
