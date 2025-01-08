import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../../public/data/therestaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import API_ENDPOINT from '../../globals/api-endpoint';
import LikeButtonInitiator from '../../utils/like-button-initiator'; // Import LikeButtonInitiator

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.afterRender();
  }

  render() {
    this.shadowRoot.innerHTML = `
<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" as="style" onload="this.rel='stylesheet'">  
       <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
#likeButton {
          min-width: 75px;
          min-height: 75px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #db0000; /* Warna tombol untuk Like */
          position: fixed;
          bottom: 16px;
          right: 16px;
          border-radius: 50%;
          border: 0;
          font-size: 45px;
          color: white;
          cursor: pointer;
        }

      .restaurant {
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px 16px;
        align-items: start;
        border-radius: 12px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 32px;
        text-align: justify;
      }

      .restaurant .restaurant__poster {
        width: 100%;
        max-width: 600px;
        grid-column: 1;
      }

      .restaurant .restaurant__info {
        grid-column: 1;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .restaurant__info .info-rating::before {
        content: "⭐ ";
        color: gold;
      }

      .restaurant__overview,
      .restaurant__reviews {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }

      .restaurant__overview h3,
      .restaurant__reviews h4 {
        color: #333;
        font-size: 1.25rem;
        margin-bottom: 10px;
      }

      .restaurant__overview p,
      .restaurant__reviews p {
        line-height: 1.6;
        color: #666;
      }

      /* Styling untuk daftar menu makanan dan minuman */
      .restaurant__overview h4,
      .restaurant__overview h5 {
        color: #333;
        font-size: 1rem;
        margin-bottom: 8px;
      }

      .restaurant__overview ul {
        list-style-type: none;
        padding: 0;
        margin: 10px 0;
        background-color: #f9f9f9;
        border-radius: 18px;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .restaurant__overview ul li {
        padding: 10px 15px;
        border-bottom: 1px solid #ddd;
        font-size: 1rem;
        color: #555;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .restaurant__overview ul li:last-child {
        border-bottom: none;
      }

      .restaurant__overview ul li::before {
        content: '🍽️ ';
        margin-right: 8px;
      }

      .restaurant__overview ul li:hover {
        background-color: #e8f5e9;
        color: #333;
        transition: background-color 0.3s ease;
      }

      #reviewForm {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 20px auto;
      }

      #reviewForm input[type="text"],
      #reviewForm textarea {
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: border-color 0.3s ease;
        min-width: 44px;
        min-height: 44px;
      }

      #reviewForm button[type="submit"] {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        min-width: 44px;
        min-height: 44px;
      }

      #reviewForm button[type="submit"]:hover {
        background-color: #45a049;
      }

      .notification {
        text-align: center;
        color: #4CAF50;
        font-weight: bold;
        margin-top: 10px;
      }

      @media screen and (min-width: 768px) {
        .restaurant .restaurant__info {
          grid-column: 2;
          padding-left: 20px;
        }

        .restaurant {
          margin: 0 auto;
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 16px;
          align-items: start;
        }
      }
    </style>
    <div id="restaurant" class="restaurant" aria-label="Detail restoran"></div>
    <div id="likeButtonContainer" aria-label="Tombol suka"></div>
    <form id="reviewForm" aria-label="Form ulasan">
      <input type="text" id="reviewerName" placeholder="Nama Anda" required aria-label="Nama Anda" />
      <textarea id="reviewText" placeholder="Tulis ulasan Anda" required aria-label="Tulis ulasan Anda"></textarea>
      <button id="reviewButton" type="submit" aria-label="Kirim ulasan">Kirim Ulasan</button>
    </form>
    <div id="notification" class="notification" style="display: none;">Ulasan berhasil dikirim!</div>
    `;
  }

  async afterRender() {
    const spinner = document.createElement('spinner-component');
    this.shadowRoot.appendChild(spinner);

    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
      const restaurantContainer = this.shadowRoot.querySelector('#restaurant');
      restaurantContainer.innerHTML =
        createRestaurantDetailTemplate(restaurant);

      const likeButtonContainer = this.shadowRoot.querySelector(
        '#likeButtonContainer'
      );
      console.log(likeButtonContainer); // Debugging line

      // Initialize the like button
      await LikeButtonInitiator.init({
        likeButtonContainer,
        restaurant,
      });

      spinner.remove();

      const reviewForm = this.shadowRoot.querySelector('#reviewForm');
      const notification = this.shadowRoot.querySelector('#notification');

      if (!this._reviewFormListener) {
        this._reviewFormListener = true;

        reviewForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const reviewerName =
            this.shadowRoot.querySelector('#reviewerName').value;
          const reviewText = this.shadowRoot.querySelector('#reviewText').value;

          try {
            const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: url.id,
                name: reviewerName,
                review: reviewText,
              }),
            });

            if (response.ok) {
              const updatedRestaurant =
                await TheRestaurantDbSource.detailRestaurant(url.id);
              restaurantContainer.innerHTML =
                createRestaurantDetailTemplate(updatedRestaurant);

              // Clear input after successful submission
              this.shadowRoot.querySelector('#reviewerName').value = '';
              this.shadowRoot.querySelector('#reviewText').value = '';

              // Show success notification
              notification.style.display = 'block';
              notification.textContent = 'Ulasan berhasil dikirim!';
              setTimeout(() => {
                notification.style.display = 'none';
              }, 2000);

              console.log('Review berhasil ditambahkan');
            } else {
              console.error('Gagal menambahkan review');
            }
          } catch (error) {
            console.error('Error adding review:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      this.shadowRoot.innerHTML +=
        '<p>Error loading restaurant details. Please try again later.</p>';
      spinner.remove();
    }
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
export default RestaurantDetail;
