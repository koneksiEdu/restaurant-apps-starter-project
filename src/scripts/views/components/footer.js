class FooterElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Style footer
    this._style = document.createElement('style');
    this._shadowRoot.appendChild(this._style);
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .footer {
        background-color: #333;
        color: white;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 96%;
        font-size: 1.5em;
        padding: 8px 0;
      }
    `;
  }

  render() {
    this.updateStyle();

    const template = `
      <footer class="footer">
        <p>&copy; ${new Date().getFullYear()} <slot>RestoranKu</slot>. All rights reserved.</p>
      </footer>
    `;
    this._shadowRoot.innerHTML += template;
  }
}

customElements.define('app-footer', FooterElement);