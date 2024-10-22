import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../../templates/template-creator';
const AllRestoData = {
  async render() {
    return `
      <div class="jumbotron">
        <img src="images/heros/hero-image_1.jpg" alt="Gambar Jumbotron">
        <h1 class="jumbotron__header">AtlasRasa</h1>
        <p class="jumbotron__lead">Discover the best restaurants in town and explore our exclusive catalog of fine dining and local gems.</p>
      </div>
      <section class="restaurant-list">
        <h2>Explore Restaurants</h2>
        <div id="restaurants">
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurant();
    const moviesContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      moviesContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default AllRestoData;