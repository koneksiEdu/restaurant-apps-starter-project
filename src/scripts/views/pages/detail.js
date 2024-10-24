import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createLikeButtonTemplate } from '../../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import LoadingComponent from '../components/loading';
import CONFIG from '../../global/config';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    LoadingComponent.show();

    try {
      await this._renderRestaurantDetail(url);

      document.querySelector('#addReviewForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value;
        const review = document.querySelector('#review').value;
        const id = url.id;

        const reviewData = {
          id,
          name,
          review,
        };

        try {
          const response = await fetch(`${CONFIG.BASE_URL}/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
          });

          const result = await response.json();

          if (!result.error) {
            await this._renderRestaurantDetail(url);
          }
        } catch (error) {
          console.error('Failed to submit review', error);
        }
      });

    } catch (error) {
      console.error('Error loading restaurant:', error);
    } finally {
      LoadingComponent.hide();
    }
  },

  async _renderRestaurantDetail(url) {
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    const likeButtonContainer = document.querySelector('#likeButtonContainer');

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

    likeButtonContainer.innerHTML = createLikeButtonTemplate();
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        rating: restaurant.restaurant.rating,
      },
    });
  },
};

export default Detail;