class AppHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    const style = `
      .app-bar {
        padding: 8px 16px;
        background-color: white;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 10px;
        position: fixed;
        width: 95%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }
      
      .app-bar .app-bar__menu {
        display: flex;
        align-items: center;
      }
      
      .app-bar .app-bar__menu button {
        background-color: transparent;
        border: none;
        font-size: 18px;
        padding: 8px;
        cursor: pointer;
        min-height: 44px;
        min-width: 44px;
      }
      
      .app-bar .app-bar__brand {
        display: flex;
        align-items: center;
      }
      
      .app-bar .app-bar__brand h1 {
        font-weight: 300;
        font-size: 2em;
        user-select: none;
        color: #212121;
      }
      
      .app-bar .app-bar__navigation {
        position: absolute;
        top: 50px;
        left: -180px;
        width: 150px;
        transition: all 0.3s;
        padding: 8px;
        background-color: white;
        overflow: hidden;
      }
      
      .app-bar .app-bar__navigation.open {
        left: 0;
      }

      .app-bar .app-bar__navigation ul {
        list-style-type: none;
        padding-left: 0;
        margin: 0;
      }

      .app-bar .app-bar__navigation ul li {
        min-width: 44px;
        min-height: 44px;
      }

      .app-bar .app-bar__navigation ul li a {
        display: inline-block;
        min-height: 44px;
        color: black;
        padding: 8px;
        margin-bottom: 5px;
        width: 100%;
        color: #212121;
        font-size: 22px;
        text-decoration: none;
      }
      
      @media screen and (min-width: 650px) {
        .app-bar {
          grid-template-columns: 1fr auto;
          padding: 8px 32px;
        }
      
        .app-bar .app-bar__brand h1 {
          font-size: 1.5em;
        }
      
        .app-bar .app-bar__menu {
          display: none;
        }
      
        .app-bar .app-bar__navigation {
          position: static;
          width: 100%;
        }
      
        .app-bar .app-bar__navigation ul li {
          display: inline-block;
        }
      
        .app-bar .app-bar__navigation ul li a {
          display: inline-block;
          width: 120px;
          text-align: center;
          margin: 0;
        }
      }
      
      @media screen and (min-width: 800px) {
        .app-bar .app-bar__brand h1 {
          font-size: 2em;
        }
      }
    `;
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    this.appendChild(styleElement); // Tambahkan style sebelum template
  }

  render() {
    this.updateStyle();
    const template = `
      <header class="app-bar">
        <div class="app-bar__menu">
          <button id="hamburgerButton">☰</button>
        </div>
        <div class="app-bar__brand">
          <h1>AtlasRasa</h1>
        </div>
        <nav id="navigationDrawer" class="app-bar__navigation">
          <ul>
            <li><a href="#/home">Home</a></li>
            <li><a href="#/favourite">Favourite</a></li>
            <li class="nav__item"><a href="https://linkedin.com/in/arisadadaat/">About Us</a></li>
          </ul>
        </nav>
      </header>
    `;
    this.insertAdjacentHTML('beforeend', template); // Gunakan insertAdjacentHTML agar tidak menimpa style
  }
}

customElements.define('app-header', AppHeader);