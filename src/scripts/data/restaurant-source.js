import API_ENDPOINT from '../global/api-endpoint';

class RestaurantSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.ALL_DATA);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async searchRestaurant(query) {
    const response = await fetch(`${API_ENDPOINT.SEARCH}?q=${query}`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }
}

export default RestaurantSource;