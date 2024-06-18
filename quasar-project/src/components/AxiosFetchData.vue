<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Axios Component</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Fetch" color="primary" @click="fetchData" />
      </q-card-actions>
    </q-card>
  </template>
  
  <script lang="ts">
  import axios from 'axios'
  const url = 'https://dummyjson.com/products'
  export default {
    name: 'AxiosComponent',
    methods: {
      fetchData() {
        axios.get(url)
          .then(response => {
            this.$emit('data-fetched', response.data.products)
          })
          .catch(error => {
            console.error('There was an error!', error)
          })
      }
    }
  }
  </script>
  