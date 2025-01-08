const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    console.log('[Debug] Full URL (with combiner):', url);

    const splitedUrl = this._urlSplitter(url);
    console.log('[Debug] Splitted URL:', splitedUrl);

    const combinedUrl = this._urlCombiner(splitedUrl);
    console.log('[Debug] Combined URL:', combinedUrl);

    return combinedUrl;
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    console.log('[Debug] Full URL (without combiner):', url);

    const splitedUrl = this._urlSplitter(url);
    console.log('[Debug] Splitted URL:', splitedUrl);

    return splitedUrl;
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    const result = {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
    console.log('[Debug] _urlSplitter Result:', result);
    return result;
  },

  _urlCombiner(splitedUrl) {
    const combined =
      (splitedUrl.resource ? `/${splitedUrl.resource}` : '/') +
      (splitedUrl.id ? '/:id' : '') +
      (splitedUrl.verb ? `/${splitedUrl.verb}` : '');

    console.log('[Debug] _urlCombiner Combined Result:', combined);
    return combined;
  },

  debug() {
    console.log('[Debug] Starting URL Parsing Debugging');
    const resultWithCombiner = this.parseActiveUrlWithCombiner();
    console.log('[Debug] Result with Combiner:', resultWithCombiner);

    const resultWithoutCombiner = this.parseActiveUrlWithoutCombiner();
    console.log('[Debug] Result without Combiner:', resultWithoutCombiner);

    console.log('[Debug] Debugging Complete');
  },
};

export default UrlParser;
