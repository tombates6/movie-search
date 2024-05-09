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
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      loading-text="Loading... Please wait"
      @update:options="loadItems"
    >
      <template v-slot:item.poster_url="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.poster_url}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>

      <template v-slot:item.popularity_summary="{ item }">
        <v-rating
          :model-value="item.popularity_summary"
          color="orange-darken-2"
          density="compact"
          size="small"
          readonly
        ></v-rating>
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'

  const searchTitle = ref('')
  const totalItems = ref(0)
  const loading = ref(false)
  const search = ref('')
  const items = ref([
    {
      title: 'Cosmos GTX 1660 Super',
      poster_url: '5.png',
      popularity_summary: 4,
    },
  ])

  function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true
    items.value = [
      {
        title: 'Cool guy',
        poster_url: '4.png',
        popularity_summary: 4,
      },
    ]
    loading.value = false
  }

  function onSearch() {
    search.value = searchTitle.value
  }
</script>
