<template>
  <div>
    <h1>Data Edit</h1>

    <form  @submit.prevent="updataProduct">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              v-model="product.name"
              class="form-control"
              :class="{ 'is-invalid': isSubmitted && $v.product.name.$error }" />
              <div v-if="isSubmitted && !$v.product.name.required" class="invalid-feedback">Name field is required</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="stock">Stock:</label>
            <input
              type="number"
              v-model="product.stock"
              class="form-control"
              :class="{ 'is-invalid': isSubmitted && $v.product.stock.$error }" />
              <div v-if="isSubmitted && !$v.product.stock.required" class="invalid-feedback">Name field is required</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="sku">SKU:</label>
            <input 
              type="text" 
              v-model="product.sku"
              class="form-control" 
              :class="{ 'is-invalid': isSubmitted && $v.product.sku.$error }" />
            <div v-if="isSubmitted && !$v.product.sku.required" class="invalid-feedback">Name field is required</div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <button class="btn btn-success btn-sm mr-3">
          Save
        </button>
        <router-link to="/" class="btn btn-danger btn-sm">Close</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import {required} from 'vuelidate/lib/validators';

  export default {

    props:["products"],

    data() {
      return {
        product: {
          name: "",
          stock: "",
          sku: ""  
        }, 
        isSubmitted: false
      };
    },

    validations: {
      product: {
          name: {
              required
          },
          stock: {
              required
              
          },
          sku: {
              required
          }
      }
    },

    async created() {
      axios.get(`http://localhost:3000/products/${this.products.id}`)
          .then((response) => {
            console.log(response);
            this.product = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    },

    methods: {

      updataProduct() {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        
        const object = {
          name: this.product.name,
          stock: this.product.stock,
          sku: this.product.sku
        }
        
        axios.put(`http://localhost:3000/products/${this.products.id}`, object)
            .then((response) => {
              console.log(response.data)
              this.products = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
  };
</script>