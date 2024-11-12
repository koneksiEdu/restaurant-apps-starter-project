/* eslint-disable no-undef */
import FavoriteRestaurantDb from '../src/scripts/data/favourite-restaurant-db';
import * as TestFactories from './helpers/testFactories';

describe('Unliking a Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantDb.putResto({ id: 1, name: 'Restaurant Test' });
  });

  afterEach(async () => {
    await FavoriteRestaurantDb.deleteResto(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    const unlikeButton = document.querySelector('[aria-label="unlike this resto"]');
    expect(unlikeButton).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    const unlikeButton = document.querySelector('[aria-label="like this resto"]');
    expect(unlikeButton).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDb.getAllRestos()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    await FavoriteRestaurantDb.deleteResto(1);

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDb.getAllRestos()).toEqual([]);
  });
});