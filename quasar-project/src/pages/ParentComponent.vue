<template>
    <q-page class="q-pa-md">
      <h1>Product Store</h1>
      <AxiosComponent @data-fetched="handleDataFetched" />
      <DisplayComponent :columns="columns" :rows="rows" v-if="Object.keys(rows[0]).length > 0" @edit-row="showEditDialog" @delete-row="showDeleteDialog" />
      
      <q-dialog v-model="deleteDialog" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="question_mark" color="primary" text-color="white" />
            <span class="q-ml-sm">are you sure want to delete?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="yes" color="primary" @click="deleteRow" v-close-popup />
            <q-btn flat label="no" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="editDialog">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">Edit Row</div>
          </q-card-section>
  
          <q-card-section>
            <q-input v-model="selectedRow.sku" label="SKU" />
            <q-input v-model="selectedRow.title" label="Title" />
            <q-input v-model="selectedRow.description" label="Description" />
            <q-input v-model="selectedRow.category" label="Category" />
            <q-input v-model="selectedRow.price" label="Price" type="number" />
            <q-input v-model="selectedRow.rating" label="Rating" type="number"/>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Save" color="primary" @click="saveRow" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script lang="ts">
  import { toRaw, ref } from 'vue'
  import { useQuasar } from 'quasar';
  import AxiosComponent from 'src/components/AxiosFetchData.vue'
  import DisplayComponent from 'src/components/DisplayComponent.vue'

  export default {
    name: 'ParentComponent',
    components: {
      AxiosComponent,
      DisplayComponent
    },
    data() {
    const $q = useQuasar();
      const selectedRow = {
          id: 0,
          sku: '',
          title: '',
          description: '',
          category: '',
          price: 0,
          rating: 0,
        }
      return {
        $q,
        fetchedData: [],
        deleteDialog: ref(false),
        editDialog: ref(false),
        selectedRow,
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
          rows: [{}],
      }
    },
    methods: {
      handleDataFetched(data) {
        this.rows = toRaw(data)
      },
      showDeleteDialog(row){
        this.deleteDialog = true
        Object.assign(this.selectedRow, row)
      },
      showEditDialog(row){
        this.editDialog = true
       Object.assign(this.selectedRow, row)
      },
      saveRow() {
        const index = this.rows.findIndex(r => r.id === this.selectedRow.id);
        if (index !== -1) {
          Object.assign(this.rows[index], this.selectedRow)
        }
        this.$q.notify({
          type: 'success',
          message: `successfully saved`,
          position: 'bottom',
          timeout: 3000,
        });
      },
      deleteRow() {
        this.rows = this.rows.filter(r => r.id !== this.selectedRow.id)
        this.$q.notify({
          type: 'success',
          message: `successfully deleted`,
          position: 'bottom',
          timeout: 3000,
        });
      }
    }
  }
  </script>
