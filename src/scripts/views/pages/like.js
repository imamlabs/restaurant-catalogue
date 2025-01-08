import FavoriteRestaurantIdb from '../../../public/data/favorite-restaurant-idb';
import FavoriteRestaurantView from './liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const FavoriteList = {
  async render() {
    // Menampilkan spinner saat memuat
    this.showSpinner();

    const template = view.getTemplate();

    // Menghapus spinner setelah template siap
    this.hideSpinner();

    return template;
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurant: FavoriteRestaurantIdb,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurant: FavoriteRestaurantIdb,
    });
  },

  showSpinner() {
    const spinner = document.createElement('spinner-component');
    document.body.appendChild(spinner);
  },

  hideSpinner() {
    const spinner = document.querySelector('spinner-component');
    if (spinner) {
      spinner.remove();
    }
  },
};

export default FavoriteList;
