import { openDB } from 'idb'; // Mengimpor fungsi openDB dari library idb untuk berinteraksi dengan IndexedDB
import CONFIG from '../../scripts/globals/CONFIG'; // Mengimpor konfigurasi yang berisi nama database, versi, dan nama object store
import structuredClone from '@ungap/structured-clone'; // Mengimpor structuredClone dari polyfill

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG; // Mengambil nilai dari konfigurasi

// Membuka koneksi ke database dan membuat object store jika belum ada
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    // Membuat object store dengan keyPath 'id'
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

// Objek untuk berinteraksi dengan database restoran yang disukai
const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllRestaurant() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME); // Mengambil semua restoran dari object store
  },

  async putRestaurant(restaurant) {

    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    if (!id) {
      throw new Error('ID harus valid'); // Validasi ID
    }
    return (await dbPromise).delete(OBJECT_STORE_NAME, id); // Menghapus restoran berdasarkan ID dari object store
  },

  async searchRestaurant(query) {
    const restaurants = await this.getAllRestaurant();
    return restaurants.filter((restaurant) => {
      const loweredCaseRestaurantTitle = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(
        /\s/g,
        ''
      );

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

export default FavoriteRestaurantIdb; // Mengekspor objek FavoriteRestaurantIdb untuk digunakan di modul lain
