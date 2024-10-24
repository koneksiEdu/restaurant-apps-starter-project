import FavoriteRestaurantDb from '../../data/favourite-restaurant-db';
import { createRestaurantItemTemplate } from '../../templates/template-creator';
import LoadingComponent from '../components/loading';

const Like = {
  async render() {
    return `
        <div class="jumbotron">
          <img src="images/heros/hero-image_1.jpg" alt="Gambar Jumbotron">
          <h1 class="jumbotron__header">AtlasRasa</h1>
          <p class="jumbotron__lead">Discover the best restaurants in town and explore our exclusive catalog of fine dining and local gems.</p>
        </div>
        <section class="restaurant-list">
          <h2>Explore Your Favourite Restaurants</h2>
          <div id="restaurants"></div>
        </section>
    `;
  },

  async afterRender() {
    LoadingComponent.show();
    try {
      const restaurants = await FavoriteRestaurantDb.getAllRestos();
      const restosContainer = document.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        restosContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      LoadingComponent.hide();
    }
  },
};

export default Like;