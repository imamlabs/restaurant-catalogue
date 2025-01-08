import { createRestaurantItemTemplate } from '../templates/template-creator';
import TheRestaurantDbSource from '../../../public/data/therestaurantdb-source';
import '../../utils/spinner';
class RestaurantList extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <div class="content" aria-label="Daftar restoran">
        <h2 class="content__heading" aria-label="Judul daftar restoran">Daftar Restaurant</h2>
        <div id="restaurants" class="restaurants" aria-label="Container daftar restoran"></div>
      </div>
    `;
    await this.renderRestaurants();
  }

  async renderRestaurants() {
    const spinner = document.createElement('spinner-component');
    this.appendChild(spinner);
    console.log('Spinner ditambahkan');
    try {
      const restaurants = await TheRestaurantDbSource.listRestaurants();
      const restaurantsContainer = this.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      this.innerHTML +=
        '<p>Failed to load restaurant data. Please try again later.</p>';
    } finally {
      spinner.remove();
    }
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
