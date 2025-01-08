import { createRestaurantItemTemplate } from '../../templates/template-creator';


class FavoriteRestaurantView {
  getTemplate() {
    return `
       <div class="content" aria-label="Daftar restoran favorit">
        <h2 class="content__heading" aria-label="Restoran Favorit">Restaurant Favorite</h2>
        <input id="query" type="text" aria-label="cari restaurant favorit" placeholder="Cari restaurant favorit...">
        <div id="restaurant" class="restaurants">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurant(restaurant) {
    let html;
    if (restaurant.length) {
      html = restaurant.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantItemTemplate(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurant').innerHTML = html;

    document
      .getElementById('restaurant')
      .dispatchEvent(new Event('restaurant:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada Restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
