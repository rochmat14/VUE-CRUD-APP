<template>
  <div>
    <h1>Data Add</h1>

    <form @submit.prevent="addProduct">
    <!-- fields -->
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="name">Name:</label>
            <input 
              type="text" 
              v-model="productForm.name" 
              class="form-control" 
              :class="{ 'is-invalid': isSubmitted && $v.productForm.name.$error }" />
            <div v-if="isSubmitted && !$v.productForm.name.required" class="invalid-feedback">Name field is required</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="stock">Stock:</label>
            <input 
              type="number" 
              v-model="productForm.stock" 
              class="form-control" 
              :class="{ 'is-invalid': isSubmitted && $v.productForm.stock.$error }" />
            <div v-if="isSubmitted && !$v.productForm.stock.required" class="invalid-feedback">Stock field is required</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="sku">SKU:</label>
            <input 
              type="text" 
              v-model="productForm.sku" 
              class="form-control" 
              :class="{ 'is-invalid': isSubmitted && $v.productForm.sku.$error }" />
            <div v-if="isSubmitted && !$v.productForm.sku.required" class="invalid-feedback">SKU field is required</div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <button class="btn btn-success btn-sm mr-3">Save</button>
        
        <router-link to="/" class="btn btn-danger btn-sm">Close</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import {required} from 'vuelidate/lib/validators';

  export default {
    name: "create-data",
    
    data() {
      return {
        productForm: {
          name: "",
          stock: "",
          sku: ""  
        },
        isSubmitted: false
      };
    },

    validations: {
      productForm: {
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

    methods: {
      addProduct() {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        
        const object = {
          name: this.productForm.name,
          stock: this.productForm.stock,
          sku: this.productForm.sku
        }

        axios.post(`http://localhost:3000/products/`, object)
            .then(() => {
                // handle success
                this.productForm.name = '';
                this.productForm.stock = '';
                this.productForm.sku = '';
                location.href = '/add';
            })
            .catch(err => {
                // handle error
                console.log(err);
            })
      },
    },
  };
</script>
