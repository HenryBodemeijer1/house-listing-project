<template>
  <div class="container">
    <div>
      <button class="transparent-button" @click="returnToOverview">
        <span class="arrow-left">&larr;</span> Return to Overview
      </button>
      <h1>Edit House Listing</h1>
      <form @submit.prevent="updateData" method="post">
        <div class="form-group">
          <label for="street">Street Name:</label>
          <input type="text" id="street" placeholder="Enter the street name" v-model="posts.street" required>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="first-group">
              <label for="houseNumber">House Number:</label>
              <input type="number" id="houseNumber" placeholder="Enter the housenumber" v-model="posts.houseNumber" required>
            </div>
            <div class="second-group">
              <label for="houseNumberAddition">Addition (optional)</label>
              <input type="text" id="houseNumberAddition" placeholder="Addition" v-model="posts.houseNumberAddition">
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="zip">Postal Code:</label>
          <input type="text" id="zip" placeholder="e.g. 1000 AA" v-model="posts.zip" required pattern="^[1-9][0-9]{3}\s?[a-zA-Z]{2}$">
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" id="city" placeholder="e.g. Amsterdam" v-model="posts.city" required>
        </div>
        <div class="form-group">
          <label for="image">Upload Image:</label>
          <label for="image" class="image-upload-btn">
            <input type="file" id="image" accept="image/jpeg, image/png" @change="handleImageUpload">
            <div class="upload-icon" v-if="!posts.imageURL">
              <i class="fas">+</i>
            </div>
            <img v-if="posts.imageURL" :src="posts.imageURL" alt="Uploaded Image">
          </label>
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" placeholder="e.g. €150.000" v-model="posts.price" required>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="first-group">
              <label for="size">Size:</label>
              <input type="number" id="size" placeholder="e.g. 60m2" v-model="posts.size" required>
            </div>
            <div class="second-group">
              <label for="garage">Garage:</label>
              <select id="garage" v-model="posts.garage" required>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="first-group">
              <label for="bedrooms">Bedrooms:</label>
              <input type="number" id="bedrooms" placeholder="Enter amount" v-model="posts.bedrooms" required>
            </div>
            <div class="second-group">
              <label for="bathrooms">Bathrooms:</label>
              <input type="number" id="bathrooms" placeholder="Enter amount" v-model="posts.bathrooms" required>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="constructionYear">Construction Date:</label>
          <input type="number" id="constructionYear" placeholder="e.g. 1990" v-model="posts.constructionYear" min="1000" max="9999" required>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" rows="5" placeholder="Enter description" v-model="posts.description" required></textarea>
        </div>
        <button type="submit" class="create-listing-button">Update</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

export default {
  data() {
    return {
      posts: {
        street: null,
        houseNumber: null,
        houseNumberAddition: null,
        zip: null,
        city: null,
        imageURL: null,
        price: null,
        size: null,
        garage: null,
        bedrooms: null,
        bathrooms: null,
        constructionYear: null,
        description: null,
      },
      errorMessage: null,
    };
  },
  created() {
    // Fetch existing data here and populate 'posts' object
    const postId = this.$route.params.id;
    axios.get(`https://api.intern.d-tt.nl/api/houses/${postId}`, {
        headers: {
          'X-Api-Key': 'Hnvesam23gzclKCGOJPtB8UVoIdr4FAZ'
        }
      })
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  methods: {
    updateData() {
      const postId = this.$route.params.id;
      axios.put(`https://api.intern.d-tt.nl/api/houses/${postId}`, this.posts, {
        headers: {
          'X-Api-Key': 'Hnvesam23gzclKCGOJPtB8UVoIdr4FAZ'
        }
      })
      .then(response => {
        console.warn(response);
        // Optionally, handle the response here
      })
      .catch(error => {
        console.error('Error updating data:', error);
        this.errorMessage = 'Failed to update listing. Please try again later.';
      });
    },
    returnToOverview() {
      this.$router.push({ name: 'houses.index' });
    },
  },
};
</script>



<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
}

h1 {
  padding: 15px 0px;
}

.form-group {
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  align-items: center; /* Align items vertically */
}

.first-group,
.second-group {
  flex: 1; /* Each group takes up equal space */
  margin-right: 10px; /* Adjust spacing between groups */
}

.first-group label,
.second-group label {
  display: block; /* Ensure labels occupy full width */
  margin-bottom: 5px; /* Add some spacing between label and input/select */
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 0px;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.image-upload-btn {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border: 4px dashed #ccc;
  overflow: hidden;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.upload-icon {
  font-size: 36px;
}

.upload-icon i {
  color: #ccc;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

input[type="file"] {
  display: none;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.transparent-button {
  background-color: transparent;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow-left {
  margin-right: 5px; /* Adjust spacing between arrow and text */
  font-size: larger;
  padding-bottom: 3px;
  font-weight: bold;
}

.create-listing-button {
  background-color: red;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 50px;
  cursor: pointer;
  float: right;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  border: 1px solid red!important;
}

.error-message {
  color: red;
  margin-top: 10px;
}

</style> 