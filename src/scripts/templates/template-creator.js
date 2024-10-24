import CONFIG from '../global/config';

const createRestaurantDetailTemplate = (restaurant) => {
  return `
    <div class="restaurant-detail">
      <div class="content-wrapper">
        <div class="restaurant-info">
          <h1 class="restaurant-name">${restaurant.name}</h1>
          <div class="main-info">
            <img crossorigin="anonymous" class="restaurant-image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
            <div class="info-content">
              <div class="meta-info">
                <div class="rating-detail">★ ${restaurant.rating}</div>
                <div class="categories">
                  ${restaurant.categories.map((category) => `
                    <span class="category-label">${category.name}</span>
                  `).join('')}
                </div>
                <div class="address">${restaurant.address}, ${restaurant.city}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="description">
          <h2>About</h2>
          <p>${restaurant.description}</p>
        </div>

        <div class="menu-section">
          <div class="foods">
            <h2>Foods</h2>
            <ul>
              ${restaurant.menus.foods.map((food) => `
                <li>${food.name}</li>
              `).join('')}
            </ul>
          </div>

          <div class="drinks">
            <h2>Drinks</h2>
            <ul>
              ${restaurant.menus.drinks.map((drink) => `
                <li>${drink.name}</li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="reviews">
          <h2>Customer Reviews</h2>
          ${restaurant.customerReviews.map((review) => `
            <div class="review-card">
              <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-date">${review.date}</span>
              </div>
              <p class="review-text">${review.review}</p>
            </div>
          `).join('')}

          <!-- Form Add Review -->
          <div class="review-form">
            <h3>Add Your Review</h3>
            <form id="addReviewForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div class="form-group">
                <label for="review">Review</label>
                <textarea id="review" name="review" required></textarea>
              </div>
              <button type="submit" class="submit-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};

const createRestaurantItemTemplate = (restaurant) => `
  <div>
    <div class="restaurant-card" role="button" aria-label="${restaurant.name}">
      <img
        crossorigin="anonymous" 
        src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" 
        alt="Image of ${restaurant.name}" 
        class="restaurant-image" 
      />
      <h3>${restaurant.name}</h3>
      <p class="city">${restaurant.city}</p>
      <p class="rating">❤️ ${restaurant.rating}</p>
      <a href="/#/detail/${restaurant.id}">CHECK</a>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { createRestaurantItemTemplate, createRestaurantDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate };