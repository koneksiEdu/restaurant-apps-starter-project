class JumbotronElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Style jumbotron
    this._style = document.createElement('style');
    this._shadowRoot.appendChild(this._style);
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .jumbotron {
        position: relative;
        width: 100%;
        height: 400px; /* Sesuaikan tinggi jumbotron */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        text-align: center;
        padding-top: 56px; /* Tambahkan padding sesuai tinggi header fixed */
      }

      .jumbotron img {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
      }

      .jumbotron__header, .jumbotron__lead {
        background-color: rgba(0, 0, 0, 0.8); /* Warna background hitam transparan */
        padding: 10px 20px;
        border-radius: 5px;
      }

      .jumbotron__header {
        font-size: 3em;
        font-weight: bold;
        margin: 0;
        color: white; /* Warna teks putih agar kontras */
      }

      .jumbotron__lead {
        font-size: 1.5em;
        margin: 0.5em 0;
        max-width: 800px;
        color: white; /* Warna teks putih */
      }

      @media (min-width: 1200px) {
        .jumbotron img {
          width: 1000px;
        }
      }
    `;
  }

  render() {
    this.updateStyle();

    const template = `
      <div class="jumbotron">
        <img src="images/heros/hero-image_1.jpg" alt="Gambar Jumbotron">
        <h1 class="jumbotron__header">Welcome to <slot>RestoranKu</slot></h1>
        <p class="jumbotron__lead">Discover the best restaurants in town and explore our exclusive catalog of fine dining and local gems.</p>
      </div>
    `;
    this._shadowRoot.innerHTML += template;
  }
}

// Daftarkan custom element
customElements.define('jumbotron-element', JumbotronElement);