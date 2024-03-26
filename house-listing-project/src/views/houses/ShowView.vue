<template>
  <div class="container">
    <button class="transparent-button" @click="returnToOverview">
        <span class="arrow-left">&larr;</span> Return to Overview
    </button>
    <div v-for="house in houses" class="house-details" :key="house.id">
      <!-- House Image -->
      <div class="house-image">
        <!-- Ensure house.image is not null or undefined -->
        <img v-if="house.image" :src="house.image" alt="House Image">
        <img class="alt-img" v-else src="@/assets/house-alt-img.png" alt="Alternative Image">
      </div>
      
      <!-- House Details -->
      <div class="house-info">
        <div class="house-header">
          <!-- Location -->
          <h2>          
            {{ house.location ? `${house.location.street || ''} ${house.location.houseNumber || ''} ${house.location.houseNumberAddition || ''}` : 'Location not available' }}
          </h2>
            <!-- Display Edit and Delete Buttons for User's Listings -->
            <div v-if="house.isUserListing" class="edit-delete-buttons">
              <button @click="editHouse(house.id)">
                <i class="fas fa-edit" style="color: red;"></i>
              </button>
              <button @click="initiateDelete(house.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>        
        </div>        
        
        <!-- Ensure house.location is not null or undefined -->
        <p>{{ house.location ? `${house.location.zip || ''}, ${house.location.city || ''}` : 'Location not available' }}</p>
        
        <!-- Price, Size, Construction Year -->
        <p class="price-size-year">
          <span>$ {{ house.price }}</span>
          <span>{{ house.size }} sq ft</span>
          <span>Built in {{ house.constructionYear }}</span>
        </p>
        
        <!-- Bedrooms and Bathrooms -->
        <p class="bed-bath" v-if="house.rooms">
          <span>Bedrooms: {{ house.rooms.bedrooms }}</span>
          <span>Bathrooms: {{ house.rooms.bathrooms }}</span>
          <span>Garage: {{ house.hasGarage ? 'Yes' : 'No' }}</span>  
        </p>
        <!-- Ensure house.rooms is not null or undefined -->
        
        <!-- Description -->
        <p class="description">Description: {{ house.description }}</p>
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
import { ref, onMounted, } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const houses = ref(null);
const error = ref(null);


const apiKey = 'Hnvesam23gzclKCGOJPtB8UVoIdr4FAZ';
const fetchHouse = async () => {
  const houseId = route.params.id; // Get house ID from route params
  if (!houseId) {
    error.value = 'House ID is missing.';
    return;
  }

  try {
    const response = await axios.get(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    if (Array.isArray(response.data)) {
      houses.value = response.data;
    } else {
      houses.value.push(response.data);
    }
  } catch (error) {
    console.error('Error fetching house:', error);
    error.value = 'Failed to fetch house data. Please try again later.';
  }
};

onMounted(fetchHouse);

const editHouse = (houseId) => {
  router.push({ name: 'houses.edit', params: { id: houseId } });
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

const returnToOverview = () => {
  router.push({ name: 'houses.index' });
};
</script>

<style scoped>
.container {
  margin: 60px 0 0 0;
  padding: 0 0 0 25px;
}

.house-details {
  width: 100%;
  max-width: 800px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.house-image {
  background-color: white;
}

.house-image img {
  width: 100%;
  height: auto;
}

.alt-img {
  height: 550px!important; 
  padding:20px;
}

.house-info {
  background-color: white;
  padding: 20px;
  position: relative; 
  bottom: 6px;
}

.house-info h2 {
  font-size: 24px;
  font-weight: bold;
}

.house-header {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-bottom: 10px;
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

.house-info p {
  margin-bottom: 8px;
}

.price-size-year {
  display: flex;
  justify-content: space-evenly; 
  color: #333;
  padding-right: 150px;
}

.price-size-year span, .bed-bath span {
  flex: 1; 
}

.bed-bath {
  display: flex;
  justify-content: space-evenly; /* Equal spacing between elements */
  padding-right: 150px;
  color: #666;
}

.description {
  font-style: italic;
  color: #444;
}

.transparent-button {
  background-color: transparent;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 15px 0;
}

.arrow-left {
  margin-right: 5px; /* Adjust spacing between arrow and text */
  font-size: larger;
  padding-bottom: 3px;
  font-weight: bold;
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
</style>