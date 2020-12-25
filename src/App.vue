<template v-slot:cell(remove)="data">
  <div id="app">
    <div class="container">
      <!-- {{ loading }} -->
      <h1 class="text-center">CRUD VUE JS</h1>
      
      <router-view />
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Action (delete/edit)</th>
          </tr>

          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.sku }}</td>
            <td>
              <button 
                class="btn btn-danger btn-sm mr-3" 
                v-on:submit.prevent="deleteData()" 
                @click="deleteData(product, products) in products">Delete</button>

              <button 
                v-on:submit.prevent="edit()" 
                @click="edit(product, products) in products" 
                class="btn btn-warning btn-sm">Edit</button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "App",

    data() {
      return {
        products: [],
      };
    },

    async created() {
      axios.get(`http://localhost:3000/products`)
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },

    async updated() {
      axios.get(`http://localhost:3000/products`)
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.error(e);
          });
    },

    methods: {

      edit(product) {
        this.$router.push({
          name:"edit-form",      
          params: {products:product}
        })
      },
      
      deleteData(products, id) {
        axios.delete('http://localhost:3000/products/' + products.id)
        .then(() => {
          this.products.splice(id, 1)
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>