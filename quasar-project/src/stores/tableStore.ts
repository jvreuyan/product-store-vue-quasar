import { defineStore } from 'pinia';
import axios from 'axios';

export interface Row {
    id: number;
    sku: string;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    [key: string]: any;
}

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    rows: [] as Row[],
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
  }),
  actions: {
    async fetchRows() {
      const url = 'https://dummyjson.com/products'
      try {
        const response = await axios.get(url);
        this.rows = response.data.products;
      } catch (error) {
        console.error('Error fetching rows:', error);
      }
    },
    deleteRow(row: Row) {
      try {
        this.rows = this.rows.filter(r => r.id !== row.id);
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    },
    updateRow(updatedRow: Row) {
      try {
        const index = this.rows.findIndex(r => r.id === updatedRow.id);
        if (index !== -1) {
          this.rows[index] = updatedRow;
        }
      } catch (error) {
        console.error('Error updating row:', error);
      }
    }
  }
});