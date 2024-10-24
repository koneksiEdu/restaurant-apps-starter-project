import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createLikeButtonTemplate } from '../../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import LoadingComponent from '../components/loading';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    // Tampilkan komponen loading
    LoadingComponent.show();

    try {
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurant');
      const likeButtonContainer = document.querySelector('#likeButtonContainer');

      likeButtonContainer.innerHTML = createLikeButtonTemplate();
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: restaurant.restaurant.id,
          name: restaurant.restaurant.name,
          city: restaurant.restaurant.city,
          pictureId: restaurant.restaurant.pictureId,
          rating: restaurant.restaurant.rating
        },
      });
    } catch (error) {
      console.error('Error loading restaurant:', error);
    } finally {
      // Sembunyikan komponen loading setelah data selesai di-load
      LoadingComponent.hide();
    }
  },
};

export default Detail;