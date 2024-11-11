/* eslint-disable no-undef */
const assert = require('assert');
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});

Scenario('like and unliking a liked restaurant', async ({ I }) => {
  I.see('No favorite restaurants found.', '.resto-item__not__found');

  I.amOnPage('/');
  I.seeElement('.restaurant-card a');
  const firstRestaurant = locate('.restaurant-card a').first();
  const firtRestaurantH3 = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firtRestaurantH3);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favourite');
  I.seeElement('.restaurant-card');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(locate('.restaurant-card a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favourite');
  I.see('No favorite restaurants found.', '.resto-item__not__found');
});

Scenario('adding a review', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.restaurant-card a');
  const firstRestaurant = locate('.restaurant-card a').first();
  const firtRestaurantH3 = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firtRestaurantH3);
  I.click(firstRestaurant);

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  I.seeElement('#addReviewForm');

  I.fillField('#name', 'Sada');
  I.fillField('#review', 'E2E review');

  I.click('.submit-button');

  I.wait(2);

  I.see('Sada', '.reviewer-name');
  I.see('E2E review', '.review-text');

});