<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Table Component</div>
      </q-card-section>
      <q-table
        title="Products"
        :rows="rows"
        :columns="columns"
        row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round icon="edit" @click="editRow(props.row)" />
          <q-btn flat round icon="delete" color="negative" @click="deleteRow(props.row)" />
        </q-td>
      </template>
    </q-table>
    </q-card>
  </template>
  
  <script lang="ts">

  export default {
    name: 'DisplayComponent',
    props: {
      columns: {
        type: Array,
      },
      rows: {
        type: Array,
      }
    },
    methods: {
      editRow(row) {
        this.$emit('edit-row', row);
      },
      deleteRow(row) {
        this.$emit('delete-row', row);
      }
    },
  };
  </script>
  