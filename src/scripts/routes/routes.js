import RestaurantDetail from '../views/pages/detail';
import FavoriteList from '../views/pages/like'; // Menggunakan FavoriteList dari like
import RestaurantList from '../views/pages/list-restaurant';

const routes = {
  '/': RestaurantList,
  '/home': RestaurantList,
  '/detail/:id': RestaurantDetail,
  '/favorite': FavoriteList,
};

export default routes;
