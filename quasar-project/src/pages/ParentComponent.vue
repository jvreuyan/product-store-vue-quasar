<template>
    <q-page class="q-pa-md">
      <h1>Product Store</h1>
      <AxiosComponent @data-fetched="handleDataFetched" />
      <DisplayComponent :columns="columns" :rows="rows" @edit-row="editRow" @delete-row="deleteRow" />
    </q-page>
  </template>
  
  <script lang="ts">
  import { toRaw } from 'vue';
  import AxiosComponent from 'src/components/AxiosFetchData.vue';
  import DisplayComponent from 'src/components/DisplayComponent.vue';
  
  export default {
    name: 'ParentComponent',
    components: {
      AxiosComponent,
      DisplayComponent
    },
    data() {
      return {
        fetchedData: [],
        columns: [
                    {
                        name: 'id',
                        required: true,
                        label: 'ID',
                        align: 'left',
                        field: row => row.id,
                        format: val => `${val}`,
                        sortable: true
                    },
                    { name: 'sku', align: 'center', label: 'SKU', field: 'sku', sortable: true },
                    { name: 'title', label: 'Title', field: 'title', sortable: true },
                    { name: 'description', label: 'Description', field: 'description' },
                    { name: 'category', label: 'Category', field: 'category' },
                    { name: 'price', label: 'Price', field: 'price' },
                    { name: 'rating', label: 'Total Rating', field: 'rating' },
                    { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
                    ],
          rows: [],
      };
    },
    methods: {
      handleDataFetched(data) {
        this.rows = toRaw(data);
      },
      editRow(row) {
        console.log('Edit:', row);
        // Add your edit logic here
      },
      deleteRow(row) {
        console.log('Delete:', row);
        // Add your delete logic here
      }
    }
  };
  </script>
  