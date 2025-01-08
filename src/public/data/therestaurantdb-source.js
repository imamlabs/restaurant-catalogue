import API_ENDPOINT from '../../scripts/globals/api-endpoint';

class TheRestaurantDbSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants; // Menyesuaikan dengan properti dari response
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant; // Menyesuaikan dengan properti dari response
  }

  static async addReviewRestaurant(reviewData) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    return response.json();
  }
}

export default TheRestaurantDbSource;
