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
        
        position: relative;
        bottom: 0;
        width: 100%;
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