import FavoriteRestaurantIdb from '../../public/data/favorite-restaurant-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../../scripts/views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  async _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = this._likeButtonContainer.querySelector('.like');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        this._renderButton();
      });
    } else {
      console.error('Like button not found in the container.');
    }
  },

  async _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = this._likeButtonContainer.querySelector('.like');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
        this._renderButton();
      });
    } else {
      console.error('Liked button not found in the container.');
    }
  },
};

export default LikeButtonInitiator;
