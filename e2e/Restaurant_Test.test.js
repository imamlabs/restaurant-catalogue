const assert = require('assert');

Feature('Restaurant Interactions');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.waitForElement("#query", 10);
  I.seeElement('#query');
  I.see(
    'Tidak ada Restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(
    'Tidak ada Restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );
  I.amOnPage('/');
  I.waitForElement(".restaurant__title a", 20);
  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.waitForElement("#likeButton", 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
   I.waitForElement(".restaurant-item", 20);
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see(
    'Tidak ada Restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );
  I.amOnPage('/');
  I.waitForElement(".restaurant__title a",20);
  I.seeElement('.restaurant__title a');
  const titles = [];
  for (let i = 1; i <= 3; i++) {
    const restaurant = locate('.restaurant__title a').at(i);
    I.click(restaurant);
    I.waitForElement("#likeButton", 20);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }
  I.amOnPage('/#/favorite');
  I.waitForElement("#query", 20);
  I.seeElement('#query');
  const visibleLikedRestaurants =
    await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(titles.length, visibleLikedRestaurants);
  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  const matchingRestaurants = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants =
    await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedLikedRestaurants
  );
  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant__title').at(i + 1)
    );
    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});

Scenario('unliking a restaurant', async ({ I }) => {
  I.see(
    'Tidak ada Restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );
  I.amOnPage('/');
   I.waitForElement(".restaurant__title a", 10);
  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  I.click(firstRestaurant);
   I.waitForElement("#likeButton", 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.waitForElement(".restaurant-item", 10);
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant__title a').first());
   I.waitForElement("#likeButton", 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see(
    'Tidak ada Restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );
});


Scenario('Submitting a customer review', async ({ I }) => {
  I.amOnPage('/'); 
   I.waitForElement(".restaurant__title a", 10);
  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  I.click(firstRestaurant);

  // Wait for the review form to appear.  This is crucial!  Increase timeout if needed.
  I.waitForVisible(
    '#reviewForm',
    20,
    'Review form not found after clicking restaurant title'
  );

  I.seeElement('#reviewForm');
  I.seeElement('#reviewerName');
  I.seeElement('#reviewText');
  const reviewerName = 'Hello Dicoding';
  const reviewText = 'Testing Customer Review e2e';
  I.fillField('#reviewerName', reviewerName);
  I.fillField('#reviewText', reviewText);
  I.click('button[type="submit"]');
  I.waitForVisible('#notification', 10);

  I.seeElement('#notification[style*="display: block"]');
  I.see('Ulasan berhasil dikirim!', '#notification'); 
  I.waitForVisible('.restaurant__reviews', 10, 'Reviews section not found'); 
  I.see(reviewerName, '.restaurant__reviews'); 
  I.see(reviewText, '.restaurant__reviews'); 

});
