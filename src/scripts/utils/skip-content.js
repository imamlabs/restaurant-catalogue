class SkipToContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    event.preventDefault();

    const contentId = this.getAttribute('content-id') || 'mainContent';
    const mainContent = document.getElementById(contentId);

    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
      mainContent.focus();
    } else {
      console.warn(`Element with ID "${contentId}" not found.`);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
     <style>
        :host {
          display: block;
        }

        .skip-to-content {
          position: absolute;
          top: -50px;
          left: 0;
          background: #D84315;
          color: white;
          padding: 8px;
          z-index: 100;
          transition: top 0.3s;
          text-decoration: none;
        }

        .skip-to-content:focus {
          top: 0;
        }
      </style>

      <a href="#" class="skip-to-content">
        Skip to Content
      </a>
    `;
  }
}

customElements.define('skip-to-content', SkipToContent);
