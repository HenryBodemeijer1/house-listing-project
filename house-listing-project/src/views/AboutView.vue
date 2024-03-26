<template>
  <div class="container">
    <div class="about">
      <h1>About DTT Real Estate.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum mattis dui, in finibus leo commodo id. Cras semper tristique dui vitae hendrerit. Nullam id turpis quis leo scelerisque placerat eget nec ex. Integer porta felis ut arcu vehicula, a scelerisque velit efficitur. Aliquam lobortis maximus mi et pharetra. Maecenas ac sapien sit amet augue venenatis hendrerit. Aenean non felis id purus eleifend placerat quis in erat. Fusce non justo sed sem venenatis interdum vitae nec urna. Praesent quis augue ac odio scelerisque sollicitudin eget et felis. Curabitur a mattis nulla. Mauris viverra nulla id purus volutpat dignissim. Donec eget elementum erat. Duis ultricies a ex eu egestas. Suspendisse eget arcu eu libero hendrerit mattis. Ut imperdiet dolor ac lectus ultricies tempus. Duis et aliquam leo, et sagittis justo.</p>
      <br>
      <p>Morbi vel dui in eros rutrum euismod. In egestas urna quis turpis eleifend maximus. Nulla facilisi. Praesent condimentum fringilla nisi nec ornare.</p>
      <br><br>
      <h1>Design and Development.</h1>
      <div class="logo-container">
        <img src="@/assets/img_DTT_logo_black.svg" alt="Logo" />
        <div class="logo-info">
          <p>By DTT</p>
          <a href="www.d-tt.nl">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
}

.about h1 {
  margin-bottom: 15px;
}

.logo-container {
  display: flex;
  align-items: center; 
}

.logo-info {
  margin-left: 30px; 
}

.logo-info a {
  margin: 0;
}

.logo-info a {
  margin: 0;
  color: blue; 
}

.logo-container img {
  height: 80px;
}

</style>
