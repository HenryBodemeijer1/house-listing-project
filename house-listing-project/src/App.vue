<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="navbar">
      <div class="navbar__container">
        <div class="navbar__brand">
          <!-- Your logo image -->
          <img src="@/assets/img_DTT_logo_black.svg" alt="Logo" />
        </div>
        <div class="navbar__links">
          <!-- Navigation links -->
          <RouterLink to="/">Houses</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
      </div>
    </nav>
  <RouterView />
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff; 
  color: #333; /* Dark text color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  z-index: 1000; 
}

.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.navbar__brand img {
  height: 40px; 
}

.navbar__links {
  display: flex;
  align-items: center;
}

.navbar__links{
  margin-right: 20px;
  color: #333; 
  text-decoration: none;
  display: block; 
  padding: 10px; 
  height: 100%; 
}

.navbar__links router-link:hover {
  text-decoration: underline;
}

.router-link-active {
  color: #000!important;
  font-weight: bold!important; 
}

a {
  padding: 23px 35px;
  color: gray!important;
}
</style>