import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._initialAppShell();
  }
  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);

    const page = routes[url];


    if (page && typeof page === 'function') {
      const pageElement = new page();
      this._content.innerHTML = '';
      this._content.appendChild(pageElement);
      if (pageElement.afterRender) {
        await pageElement.afterRender();
      }
    } else if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      console.error(`Route not found: ${url}`);
      this._content.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }
}

export default App;
