<template>
  <div class="container">

    <!-- Header with Add New House Button -->
    <div class="header">
      <h1>Available Houses</h1>
      <button class="add-house-btn" @click="goToCreatePage">+ Create new</button>
    </div>

    <div class="search-sort-container">
      <!-- Search Bar -->
      <div class="search-bar">
          <form @submit.prevent="search">
            <div class="search-input-container">
              <input type="text" v-model="searchQuery" placeholder="Search..." ><button v-if="showClearButton" class="clear-button" @click="clearSearch"></button></input>
              
            </div>
          </form>
          <h3 v-if="searchQuery">{{ filteredHouses.length }} results found</h3>
      </div>

      <!-- Sort Buttons -->    
      <div class="button-container">
        <div class="button-spacing">
          <button :class="{ active: sortBy === 'price' }" @click="sortByPrice">Sort by Price</button>
          <button :class="{ active: sortBy === 'size' }" @click="sortBySize">Sort by Size</button>
        </div>
      </div>
    </div> 

    <!-- House Listings -->
    <div class="house-listings">
      <!-- Show message if no results found -->
      <div v-if="filteredHouses.length === 0" class="no-results-message">
        <img src="@/assets/no-result.png" alt="Search Image">
        <p>No results found.</p>
        <p>Please try another keyword.</p>
      </div>

      <!-- Show house listings if results found -->
      <div v-else>
        <router-link v-for="house in filteredHouses" :key="house.id" :to="{ name: 'houses.show', params: { id: house.id }}">
          <div class="house">
            <!-- House Image -->            
            <img class="house-image" v-if="house.image" :src="house.image" alt="House Image">
            <img class="house-image" v-else src="@/assets/house-alt-img.png" alt="Alternative Image">       

            <!-- House Details -->
            <div class="house-details">
              <div class="house-header">
                <h2>{{ house.location.street }} {{ house.location.housesNumber }}</h2>
                <!-- Display Edit and Delete Buttons for User's Listings -->
                <div v-if="house.isUserListing" class="edit-delete-buttons">
                  <router-link :key="house.id" :to="{ name: 'houses.edit', params: { id: house.id }}">
                    <i class="fas fa-edit" style="color: red;"></i>
                  </router-link>
                  <button @click="initiateDelete(house.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <p>${{ house.price }}</p>
              <p class="zip-city">{{ house.location.zip }}, {{ house.location.city }}</p>
              <p class="bed-bath-size">
                <span>Bedrooms: {{ house.rooms.bedrooms }}</span>
                <span>Bathrooms: {{ house.rooms.bathrooms }}</span>
                <span>Size: {{ house.size }} sq ft</span>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div> 
    <!-- Modal for confirming deletion -->
    <div v-if="showDeleteModal" class="modal">
        <div class="modal-content">
        <h2>Delete Listing</h2>
        <p>Are you sure you want to delete this listing?<br>This action cannot be undone!</p>
        <div class="modal-buttons">
            <button class="delete-btn" @click="confirmDelete">Yes, Delete</button>
            <button class="go-back-btn" @click="cancelDelete">Go Back</button>
        </div>
        </div>
    </div>   
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// API key
const apiKey = 'Hnvesam23gzclKCGOJPtB8UVoIdr4FAZ';
// Array to store houses
let houses = [];

// Fetch houses from API
axios.get('https://api.intern.d-tt.nl/api/houses', {
  headers: {
    'X-Api-Key': apiKey
  }
})
.then(response => {
  houses = response.data;
})
.catch(error => {
  console.error('Error fetching houses:', error);
});

// Search query
const searchQuery = ref('');

// Sort by (price or size)
const sortBy = ref('price');

// Function to sort by price
const sortByPrice = () => {
  sortBy.value = 'price';
};

// Function to sort by size
const sortBySize = () => {
  sortBy.value = 'size';
};

// Function to navigate to create page
const goToCreatePage = () => {
  router.push({ name: 'houses.create' });
};

// Reactive variable to control the display of the delete modal
const showDeleteModal = ref(false);

// ID of the house to be deleted
let houseToDeleteId = null;

// Function to delete a house
const deleteHouse = (houseId) => {
  const index = houses.value.findIndex(house => house.id === houseId);
  if (index !== -1) {
    houses.value.splice(index, 1);
  }
};

// Function to initiate the deletion process
const initiateDelete = (houseId) => {
  houseToDeleteId = houseId;
  showDeleteModal.value = true;
};

// Function to confirm deletion
const confirmDelete = () => {
  deleteHouse(houseToDeleteId);
  // Hide the modal after deletion
  showDeleteModal.value = false;
};

// Function to cancel deletion
const cancelDelete = () => {
  // Reset the house to delete ID and hide the modal
  houseToDeleteId = null;
  showDeleteModal.value = false;
};

// Function to clear the search query
const clearSearch = () => {
  searchQuery.value = '';
};

// Computed property to determine whether to show the clear search button
const showClearButton = computed(() => {
  return searchQuery.value !== '';
});

// Computed property to filter houses based on search query and sort criteria
const filteredHouses = computed(() => {
  let filtered = houses.filter(house => {
    const searchTerm = searchQuery.value.toLowerCase();
    return house.location.street.toLowerCase().includes(searchTerm) ||
           house.location.zip.toLowerCase().includes(searchTerm) ||
           house.location.city.toLowerCase().includes(searchTerm);
  });

  if (sortBy.value === 'price') {
    filtered.sort((a, b) => b.price - a.price); // Sort prices from high to low
  } else if (sortBy.value === 'size') {
    filtered.sort((a, b) => b.size - a.size); // Sort sizes from high to low
  }

  return filtered;
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-house-btn {
  background-color: red;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 50px;
  cursor: pointer;
}

.search-sort-container {
  display: grid;
  grid-template-columns: 0.75fr 1fr;
  margin-bottom: 20px;
}

.search-bar {
  flex: 1;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  margin-right: 5px;
  width: 100%;
  padding: 12px 30px 12px 40px;
  border: 0px;
  border-radius: 4px;
  box-sizing: border-box;
  background-image: url('@/assets/search-icon.png'); 
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px;
}

.search-bar .clear-button {
  position: sticky;
  left: 44%;
  transform: translateY(-130%);
  background-color: #ccc; 
  width: 25px; 
  height: 25px; 
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.search-bar .clear-button::after,
.search-bar .clear-button::before {
  content: '';
  position: absolute;
  width: 2px; 
  height: 16px; 
  background-color: white; 
}

.search-bar .clear-button::after {
  transform: rotate(45deg); 
}

.search-bar .clear-button::before {
  transform: rotate(-45deg); 
}

.button-spacing {
  float: right;
}

.button-container button {
  flex: 1;
  font-weight: bold;
  border: none;
  outline: none;
  padding: 12px 25px;
  cursor: pointer;
}

.button-container button.active {
  background-color: red; /* Color when button is clicked */
  color: white;
}

.button-container button:not(.active) {
  background-color: grey; /* Color when button is not clicked */
  color: white;
}

.button-container button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.button-container button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.house {
  display: flex;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
}

.house-image {
  width: 200px;
  height: auto;
  margin-right: 20px;
  border-radius: 10px;
}

.house-header {
  display: flex;
  justify-content: space-between;
  align-items: center; 
}

.edit-delete-buttons {
  display: flex;
}

.edit-delete-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

.house-details {
  flex: 1;
}

.house-details h2 {
  font-weight: bold;
}

.house-details p {
  margin: 5px;
}

.zip-city {
  color: #ccc;
}

.bed-bath-size {
  display: flex;
  justify-content: space-evenly; 
  color: #333;
  padding-right: 500px;
}

.bed-bath-size span {
  flex: 1; 
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal h2 {
  margin-top: 0;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-buttons .delete-btn {
  background-color: red;
  color: white;
}

.modal-buttons .go-back-btn {
  background-color: #ccc;
  color: black;
}




@media (max-width: 600px) {
  .house {
    flex-direction: column;
  }

  .house-image img {
    width: 100%;
    margin-bottom: 10px;
  }
}

.no-results-message {
  text-align: center;
  margin-top: 50px;
}

.no-results-message img {
  text-align: center;
  margin: 40px 0;
  height: 200px;
  width: 200px;
}
</style>