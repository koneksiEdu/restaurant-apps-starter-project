const LoadingComponent = {
  show() {
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loading';
    loadingElement.innerHTML = `
      <div class="spinner"></div>
      <p>Loading...</p>
    `;
    document.body.appendChild(loadingElement);
  },

  hide() {
    const loadingElement = document.querySelector('#loading');
    if (loadingElement) {
      loadingElement.remove();
    }
  },
};

export default LoadingComponent;