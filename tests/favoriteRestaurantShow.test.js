import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should render the information that no restaurant have been liked', () => {
      const favoriteRestaurant = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      const restaurant = [];
      presenter._displayRestaurant(restaurant);

      expect(
        document.querySelectorAll('.restaurant-item__not__found').length
      ).toEqual(1);
    });
    it('should ask for the favorite restaurant', () => {
      const favoriteRestaurant = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalledTimes(1);
    });
  });
  describe('When favorite restaurant exist', () => {
    it('should show the restaurant', (done) => {
      document
        .getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            2
          );

          done();
        });

      const favoriteRestaurant = {
        getAllRestaurant: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            rating: 3,
            description: 'Sebuah restaurant A',
          },
          {
            id: 22,
            name: 'B',
            rating: 4,
            description: 'Sebuah restaurant B',
          },
        ]),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });
});
