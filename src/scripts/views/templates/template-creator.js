import CONFIG from '../../globals/CONFIG';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item" aria-label="Item restoran ${restaurant.name}">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster lazyload"  alt="${restaurant.name}"
           data-src="${
  restaurant.pictureId
    ? CONFIG.BASE_IMAGE_URL.MEDIUM + restaurant.pictureId
    : 'https://picsum.photos/id/666/800/450?grayscale'
}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${
  restaurant.rating
}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}" aria-label="Detail restoran ${
  restaurant.name
}">${restaurant.name}</a></h3>
      <p aria-label="Deskripsi restoran">${restaurant.description}</p>
    </div>
  </div>
`;
const createRestaurantDetailTemplate = (restaurant) => {
  const categories = restaurant.categories
    ? restaurant.categories.map((category) => category.name).join(', ')
    : 'Tidak ada kategori';
  const foods = restaurant.menus?.foods
    ? restaurant.menus.foods
      .map(
        (food) =>
          `<li aria-label="Menu makanan ${food.name}">${food.name}</li>`
      )
      .join('')
    : '<li aria-label="Tidak ada makanan tersedia">Tidak ada makanan tersedia</li>';
  const drinks = restaurant.menus?.drinks
    ? restaurant.menus.drinks
      .map(
        (drink) =>
          `<li aria-label="Menu minuman ${drink.name}">${drink.name}</li>`
      )
      .join('')
    : '<li aria-label="Tidak ada minuman tersedia">Tidak ada minuman tersedia</li>';
  const reviews = restaurant.customerReviews
    ? restaurant.customerReviews
      .map(
        (review) => `
      <div class="review" aria-label="Ulasan dari ${review.name}">
        <p><strong>${review.name}</strong> - ${review.date}</p>
        <p>${review.review}</p>
      </div>`
      )
      .join('')
    : '<p aria-label="Belum ada ulasan">Belum ada ulasan.</p>';

  return `
     <h2 class="restaurant__title" aria-label="Nama restoran ${
  restaurant.name
}">${restaurant.name}</h2>
    <img class="restaurant__poster" src="${
  CONFIG.BASE_IMAGE_URL.LARGE + restaurant.pictureId
}" 
         alt="Gambar restoran ${restaurant.name}" aria-label="Gambar restoran ${
  restaurant.name
}" />
    <div class="restaurant__info" aria-label="Informasi restoran">
      <h4>Rating</h4>
      <p aria-label="Rating ${restaurant.rating} dari 5">⭐️${
  restaurant.rating
}</p>
      <h4>Kategori</h4>
      <p aria-label="Kategori restoran">${categories}</p>
      <h4>Alamat</h4>
      <p aria-label="Alamat restoran">${restaurant.address}, ${
  restaurant.city
}</p>
    </div>
    <div class="restaurant__overview" aria-label="Deskripsi dan menu restoran">
      <h3>Deskripsi Restaurant</h3>
      <p aria-label="Deskripsi restoran">${restaurant.description}</p>
      <h4>Menu</h4>
      <h5>Makanan:</h5>
      <ul>${foods}</ul>
      <h5>Minuman:</h5>
      <ul>${drinks}</ul>
    </div>
    <div class="restaurant__reviews" aria-label="Ulasan pelanggan">
      <h4>Customer Reviews</h4>
      ${reviews}
    </div>
  `;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
  <!-- Tombol untuk menyukai film dengan label aksesibilitas -->
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    <!-- Ikon hati kosong untuk menunjukkan bahwa film belum disukai -->
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
  <!-- Tombol untuk menghapus suka film dengan label aksesibilitas -->
    <i class="fa fa-heart" aria-hidden="true"></i>
    <!-- Ikon hati penuh untuk menunjukkan bahwa film sudah disukai -->
  </button>
`;


export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
