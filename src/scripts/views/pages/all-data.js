import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../../templates/template-creator';
import LoadingComponent from '../components/loading';

const AllRestoData = {
  async render() {
    return `
      <div class="jumbotron">
        <picture>
          <source media="(max-width: 600px)" srcset="images/heros/hero-image_1-small.jpg">
          <source media="(min-width: 601px) and (max-width: 1024px)" srcset="images/heros/hero-image_1-medium.jpg">
          <source media="(min-width: 1025px)" srcset="images/heros/hero-image_1-large.jpg">
          <img src="images/heros/hero-image_1.jpg" alt="Gambar Jumbotron">
        </picture>
        <h1 class="jumbotron__header">AtlasRasa</h1>
        <p class="jumbotron__lead">Discover the best restaurants in town and explore our exclusive catalog of fine dining and local gems.</p>
      </div>

      <div class="search-form">
        <input type="text" id="searchInput" class="search-input" placeholder="Search for restaurants..." required />
        <button id="searchButton" class="search-button">Search</button>
      </div>

      <section class="restaurant-list">
        <h2>Explore Restaurants</h2>
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
        const restaurants = query
          ? await RestaurantSource.searchRestaurant(query)
          : await RestaurantSource.listRestaurant();

        if (restaurants.length > 0) {
          restaurants.forEach((restaurant) => {
            restosContainer.innerHTML += createRestaurantItemTemplate(restaurant);
          });
        } else {
          restosContainer.innerHTML = '<p>No restaurants found.</p>';
        }
      } catch (error) {
        console.error('Failed to load restaurants:', error);
        restosContainer.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
      } finally {
        LoadingComponent.hide();
      }
    };

    await loadRestaurants();

    searchButton.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      if (query) {
        LoadingComponent.show();
        await loadRestaurants(query);
      }
    });

    searchInput.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          LoadingComponent.show();
          await loadRestaurants(query);
        }
      }
    });
  },
};

export default AllRestoData;