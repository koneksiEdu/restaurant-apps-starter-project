import FavoriteRestaurantDb from '../../data/favourite-restaurant-db';
import { createRestaurantItemTemplate } from '../../templates/template-creator';
import LoadingComponent from '../components/loading';

const Like = {
  async render() {
    return `
      <div class="jumbotron">
        <img src="images/heros/hero-image_1.jpg" alt="Gambar Jumbotron">
        <h1 class="jumbotron__header">AtlasRasa</h1>
        <p class="jumbotron__lead">Discover your favorite restaurants.</p>
      </div>

      <div class="search-form">
        <input type="text" id="searchInput" class="search-input" placeholder="Search for your favorite restaurants..." required />
        <button id="searchButton" class="search-button">Search</button>
      </div>

      <section class="restaurant-list">
        <h2>Explore Your Favourite Restaurants</h2>
        <div id="restaurants"></div>
      </section>
    `;
  },

  async afterRender() {
    LoadingComponent.show();

    const restosContainer = document.querySelector('#restaurants');
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('#searchButton');

    const loadRestaurants = async (query = '') => {
      restosContainer.innerHTML = '';
      try {
        const restaurants = await FavoriteRestaurantDb.getAllRestos();
        const filteredRestaurants = query
          ? restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(query.toLowerCase())
          )
          : restaurants;

        if (filteredRestaurants.length > 0) {
          filteredRestaurants.forEach((restaurant) => {
            restosContainer.innerHTML += createRestaurantItemTemplate(restaurant);
          });
        } else {
          restosContainer.innerHTML = '<p>No favorite restaurants found.</p>';
        }
      } catch (error) {
        console.error('Failed to load restaurants:', error);
        restosContainer.innerHTML = '<p>Failed to load favorite restaurants. Please try again later.</p>';
      } finally {
        LoadingComponent.hide();
      }
    };

    await loadRestaurants();

    searchButton.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      LoadingComponent.show();
      await loadRestaurants(query);
    });

    searchInput.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        LoadingComponent.show();
        await loadRestaurants(query);
      }
    });
  },
};

export default Like;