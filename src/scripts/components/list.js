class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._shadowRoot.appendChild(this._style);
  }

  connectedCallback() {
    this.fetchRestaurants();
  }

  async fetchRestaurants() {
    const response = await fetch('data/DATA.json');
    const data = await response.json();
    this.restaurants = data.restaurants;
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .restaurant-list {
        padding: 20px;
        font-family: serif;
      }

      h2 {
        margin-bottom: 20px;
        text-align: center;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .restaurant-card {
        background: #fff;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        outline: none; /* Hapus outline default */
      }

      .restaurant-card:hover,
      .restaurant-card:focus {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Tambahkan bayangan saat fokus */
      }

      .restaurant-image {
        width: 100%;
        border-radius: 8px;
        height: auto;
      }

      .city {
        color: #888;
        font-size: 0.9em;
      }

      .rating {
        font-weight: bold;
      }
    `;
  }

  render() {
    this.updateStyle();

    const template = `
      <section class="restaurant-list">
        <h2>Explore Restaurants</h2>
        <div class="grid-container">
          ${this.restaurants
            .map((restaurant) => this.createCard(restaurant))
            .join('')}
        </div>
      </section>
    `;
    this._shadowRoot.innerHTML += template;
  }

  createCard(restaurant) {
    return `
      <div class="restaurant-card" tabindex="1" role="button" aria-label="${restaurant.name}">
        <img 
          src="${restaurant.pictureId}" 
          alt="Image of ${restaurant.name}" 
          class="restaurant-image" 
        />
        <h3>${restaurant.name}</h3>
        <p>${restaurant.description}</p>
        <p class="city">${restaurant.city}</p>
        <p class="rating">Rating: ${restaurant.rating}</p>
      </div>
    `;
  }
}

customElements.define("restaurant-list", RestaurantList);