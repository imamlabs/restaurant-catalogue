import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurant;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurant = {
      getAllRestaurant: jest.fn(),
      searchRestaurant: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurant.searchRestaurant.mockImplementation(() => []);

      searchRestaurant('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurant.searchRestaurant.mockImplementation(() => []);

      searchRestaurant('restaurant a');

      expect(favoriteRestaurant.searchRestaurant).toHaveBeenCalledWith(
        'restaurant a'
      );
    });

    it('should show the restaurant found by Favorite Restaurant', (done) => {
      document
        .getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            3
          );

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 111,
              name: 'restaurant abc',
              pictureId: '123',
              rating: 4.5,
              description: 'Delicious food',
            },
            {
              id: 222,
              name: 'ada juga restaurant abcde',
              pictureId: '456',
              rating: 4.0,
              description: 'Tasty dishes',
            },
            {
              id: 333,
              name: 'ini juga boleh restaurant a',
              pictureId: '789',
              rating: 3.5,
              description: 'Good ambiance',
            },
          ];
        }

        return [];
      });

      searchRestaurant('restaurant a');
    });

    it('should show the name of the restaurant found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          const restaurantTitles = document.querySelectorAll(
            '.restaurant-item h3 a'
          );

          // Pastikan elemen ditemukan sebelum mengakses textContent
          expect(restaurantTitles.length).toBeGreaterThan(0);
          expect(restaurantTitles.item(0).textContent).toEqual(
            'restaurant abc'
          );
          expect(restaurantTitles.item(1).textContent).toEqual(
            'ada juga restaurant abcde'
          );
          expect(restaurantTitles.item(2).textContent).toEqual(
            'ini juga boleh restaurant a'
          );

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 111,
              name: 'restaurant abc',
              pictureId: '123',
              rating: 4.5,
              description: 'Delicious food',
            },
            {
              id: 222,
              name: 'ada juga restaurant abcde',
              pictureId: '456',
              rating: 4.0,
              description: 'Tasty dishes',
            },
            {
              id: 333,
              name: 'ini juga boleh restaurant a',
              pictureId: '789',
              rating: 3.5,
              description: 'Good ambiance',
            },
          ];
        }

        return [];
      });

      searchRestaurant('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document
        .getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          const restaurantTitles = document.querySelectorAll(
            '.restaurant-item h3 a'
          );
          expect(restaurantTitles.length).toBeGreaterThan(0);
          expect(restaurantTitles.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444, name: '-', description: 'No name restaurant' }]; // Menambahkan nama sebagai "-"
        }

        return [];
      });

      searchRestaurant('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurant.getAllRestaurant.mockImplementation(() => []);

      searchRestaurant(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurant', () => {
      favoriteRestaurant.getAllRestaurant.mockImplementation(() => []);

      searchRestaurant('    ');

      expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => []);

      searchRestaurant('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document
        .getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            0
          );

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => []);

      searchRestaurant('restaurant a');
    });
  });
});
