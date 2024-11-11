/* eslint-disable no-undef */
import FavoriteRestaurantDb from '../src/scripts/data/favourite-restaurant-db';
import * as TestFactories from './helpers/testFactories';

describe('Liking a Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    const likeButton = document.querySelector('[aria-label="like this resto"]');
    expect(likeButton).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    const unlikeButton = document.querySelector('[aria-label="unlike this resto"]');
    expect(unlikeButton).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FavoriteRestaurantDb.getResto(1);
    expect(resto).toEqual({ id: 1, name: 'Restaurant Test' });

    await FavoriteRestaurantDb.deleteResto(1);
  });

  it('should not add a restaurant again when it\'s already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1, name: 'Restaurant Test' });

    await FavoriteRestaurantDb.putResto({ id: 1, name: 'Restaurant Test' });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const allRestos = await FavoriteRestaurantDb.getAllRestos();
    expect(allRestos).toEqual([{ id: 1, name: 'Restaurant Test' }]);

    await FavoriteRestaurantDb.deleteResto(1);
  });

  it('should not add the restaurant if it does not have an id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ name: 'Restaurant Without ID' });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDb.getAllRestos()).toEqual([]);
  });
});