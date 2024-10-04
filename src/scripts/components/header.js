class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._shadowRoot.appendChild(this._style);
    this.toggleNav = this.toggleNav.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this); // Binding the key down handler
  }

  connectedCallback() {
    this.render();
    this._shadowRoot.querySelector("#menu").addEventListener("click", this.toggleNav);
    this._shadowRoot.querySelector("#close-menu").addEventListener("click", this.toggleNav);
    this._shadowRoot.querySelector("#menu").addEventListener("keydown", this.handleKeyDown); // Add keydown listener
    this._shadowRoot.querySelector("#close-menu").addEventListener("keydown", this.handleKeyDown); // Add keydown listener
    window.addEventListener("resize", this.handleResize);
    // Listen for click events on the document to close offcanvas when clicking outside
    this._shadowRoot.addEventListener("click", this.handleClickOutside);
    this.handleResize();
  }

  disconnectedCallback() {
    this._shadowRoot.querySelector("#menu").removeEventListener("click", this.toggleNav);
    this._shadowRoot.querySelector("#close-menu").removeEventListener("click", this.toggleNav);
    this._shadowRoot.querySelector("#menu").removeEventListener("keydown", this.handleKeyDown); // Remove keydown listener
    this._shadowRoot.querySelector("#close-menu").removeEventListener("keydown", this.handleKeyDown); // Remove keydown listener
    window.removeEventListener("resize", this.handleResize);
    this._shadowRoot.removeEventListener("click", this.handleClickOutside);
  }

  toggleNav() {
    const drawer = this._shadowRoot.querySelector("#drawer");
    const menuButton = this._shadowRoot.querySelector("#menu");
    const closeMenuButton = this._shadowRoot.querySelector("#close-menu");
    drawer.classList.toggle("nav--open");

    if (drawer.classList.contains("nav--open")) {
      menuButton.style.display = "none"; 
      closeMenuButton.style.display = "block";
      // Set focus to the close button when the drawer opens
      closeMenuButton.focus();
    } else {
      menuButton.style.display = "block";
      closeMenuButton.style.display = "none";
    }
  }

  handleClickOutside(event) {
    const drawer = this._shadowRoot.querySelector("#drawer");
    if (drawer.classList.contains("nav--open") && !drawer.contains(event.target) && event.target.id !== "menu") {
      this.toggleNav(); // Close the drawer if clicking outside of it
    }
  }

  handleResize() {
    const menuButton = this._shadowRoot.querySelector("#menu");
    const closeMenuButton = this._shadowRoot.querySelector("#close-menu");
    const drawer = this._shadowRoot.querySelector("#drawer");

    if (window.innerWidth >= 768) {
      menuButton.style.display = "none";
      closeMenuButton.style.display = "none";

      drawer.classList.remove("nav--open");
    } else {
      menuButton.style.display = "block";
    }
  }

  handleKeyDown(event) {
    // Check if the key pressed is Enter or Space
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent the default action to avoid scrolling
      this.toggleNav(); // Call toggleNav to open/close the offcanvas
    }
  }

  updateStyle() {
    this._style.textContent = `
      .header {
        min-height: 56px;
        transition: min-height 0.3s;
        position: relative;
        z-index: 1001;
      }

      .header__inner {
        width: 100%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }

      .header__title {
        font-weight: 300;
        font-size: 4em;
        margin: 0.5em 0.25em;
        display: inline-block;
        color: #212121;
      }

      .header__menu, .header__close-menu {
        font-size: 32px;
        margin: 10px auto;
        display: block;
        width: 44px;
        min-width: 44px;
        min-height: 44px;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 10px;
        z-index: 1002;
      }

      .header__menu {
        display: block;
      }

      .header__close-menu {
        display: none;
      }

      .nav {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        transition: transform 0.3s ease;
        transform: translateX(-100%);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        min-height: 44px;
      }

      .nav--open {
        transform: translateX(0);
      }

      .nav__list {
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
      }

      .nav__item {
        padding: 15px 0;
      }

      .nav a {
        text-decoration: none;
        color: white;
        font-size: 24px;
      }

      .nav a:hover {
        text-decoration: underline;
      }

      @media (min-width: 768px) {
        .header__menu, .header__close-menu {
          display: none;
        }

        .nav {
          position: static;
          width: auto;
          height: auto;
          background-color: transparent;
          transform: none;
          display: block;
          min-width: 44px;
          min-height: 44px;
        }

        .nav__list {
          display: flex;
          justify-content: center;
        }

        .nav__item {
          padding: 0 15px;
        }

        .nav a {
          color: #212121;
          font-size: 18px;
        }
      }
    `;
  }

  render() {
    this.updateStyle();
    const template = `
      <header class="header">
        <div class="header__inner">
          <h1 class="header__title"><slot>RestoranKu</slot></h1>
        </div>
        <a id="menu" class="header__menu" tabindex="1">☰</a>
        <a id="close-menu" class="header__close-menu" tabindex="0">✕</a>
      </header>

      <nav id="drawer" class="nav">
        <ul class="nav__list">
          <li class="nav__item"><a href="/">Home</a></li>
          <li class="nav__item"><a href="#">Favorite</a></li>
          <li class="nav__item"><a href="https://linkedin.com/in/arisadadaat/">About Us</a></li>
        </ul>
      </nav>
    `;
    this._shadowRoot.innerHTML += template;
  }
}

customElements.define("app-header", AppHeader);