<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Find a Movie

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchTitle"
        density="compact"
        label="Search"
        append-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        @click:append-inner="onSearch"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table-server
      v-model:search="search"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      loading-text="Loading... Please wait"
      @update:options="loadItems"
    >
      <template v-slot:item.poster_image_url="{ item }">
        <v-img
          class="my-2"
          lazy-src="https://picsum.photos/id/11/100/60"
          :src="`${item.poster_image_url}`"
          height="200"
          width="150"
          cover
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
          <template v-slot:error>
            <v-img
              class="mx-auto"
              src="https://picsum.photos/id/11/100/60"
              height="200"
              width="150"
              cover
            ></v-img>
          </template>
        </v-img>
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'

  const searchTitle = ref('');
  const totalItems = ref(0);
  const loading = ref(false);
  const search = ref(undefined);
  const items = ref([]);
  const headers = ref([
    { title: 'ID', key: 'movie_id'},
    { title: 'Movie Title', key: 'title'},
    { title: 'Cover Art', key: 'poster_image_url'},
    { title: 'Popularity', key: 'popularity_summary'},
  ]);

  async function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true;
    try {
      const res = await $fetch('http://localhost:5000/movies?' + new URLSearchParams({ search: searchTitle.value }));
      items.value = JSON.parse(res);
      totalItems.value = items.value.length;
    }
    finally { loading.value = false; }
  }

  function onSearch() {
    // We just need to change the search variable to *something* to kick off the fetch request of the data table.
    search.value = String(Date.now())
  }
</script>
