class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this._favoriteRestaurant = favoriteRestaurant; 
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundsearchRestaurant;
    if (this.latestQuery.length > 0) {
      foundsearchRestaurant = await this._favoriteRestaurant.searchRestaurant(
        this.latestQuery
      ); // Diperbaiki
    } else {
      foundsearchRestaurant = await this._favoriteRestaurant.getAllRestaurant(); // Diperbaiki
    }

    this._showFoundsearchRestaurant(foundsearchRestaurant);
  }

  _showFoundsearchRestaurant(restaurant) {
    this._view.showFavoriteRestaurant(restaurant); 
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
