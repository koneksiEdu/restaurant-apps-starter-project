class SkipToContentElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render(); // Panggil render di dalam constructor
  }

  connectedCallback() {
    this.updateStyle(); // Update style saat komponen terhubung

    // Tambahkan listener untuk skip-to-content
    const skipLinkElem = this._shadowRoot.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();

      // Fokuskan ke elemen mainContent
      const mainContent = document.querySelector('#mainContent');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');  // Pastikan bisa di-fokus
        mainContent.focus();  // Pindahkan fokus ke elemen mainContent
      }
    });
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeyDown);
    const skipLinkElem = this._shadowRoot.querySelector('.skip-link');
    if (skipLinkElem) {
      skipLinkElem.removeEventListener('click', this._handleSkipClick);
    }
  }

  updateStyle() {
    this._style.textContent = `
      .skip-link {
        min-width: 44px;
        min-height: 44px;
        text-align: center;
        position: absolute;
        top: -64px;
        left: 10px;
        background-color: #333;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        z-index: 1000;
        transition: opacity 0.3s ease, top 0.3s ease;
        text-decoration: none;
        cursor: pointer;
        line-height: 44px;
      }

      .skip-link:hover {
        background-color: #555;
      }

      .skip-link:focus {
        top: 10px;
      }
    `;

    this._shadowRoot.appendChild(this._style);
  }

  render() {
    const template = `
      <a href="#mainContent" tabindex="0" class="skip-link">
        Skip to Contents
      </a>
    `;
    this._shadowRoot.innerHTML = template;
  }
}

customElements.define('skip-to-content', SkipToContentElement);