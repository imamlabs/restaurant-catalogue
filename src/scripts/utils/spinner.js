class SpinnerComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .spinner-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .spinner {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .circle {
          width: 100%;
          height: 100%;
          border: 5px solid #3498db;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="spinner-overlay">
        <div class="spinner">
          <div class="circle"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('spinner-component', SpinnerComponent);
