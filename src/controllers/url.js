const UrlService = require("../services/url");
const CrawlerService = require("../services/crawler");

module.exports = class UrlController {
  constructor(Url) {
    this.repository = Url;
  }
  async post(request, response) {
    const { url } = request.body;

    // changes: don't create the id if the url sent is not real
    // so, get the last id +1 and do the encoding, then do the job
    // what if someone do two requests together.. when I really create this
    // guy it will already exists.

    // validations that are missing:
    // 1. database is connected?
    // 2. url returns somenthing for the title on crawlerService?

    try {
      if (!UrlService.isValid(url)) {
        response.status(400).json("Please digit a valid URL.").send();
      }
      const urlMapper = { url, counter: 0 };
      const newUrlId = await this.repository.create(urlMapper);
      const code = UrlService.encode(newUrlId);
      const title = await CrawlerService.getTitle(url);
      if (!title)
        response.status(400).json("This page don't have a title").send();
      await this.repository.addCodeToUrl(newUrlId, {
        code: code,
        title: title,
      });

      response.status(200).json({ shortUrl: code }).send();
    } catch (e) {
      response.status(400).json("HOUSTON WE HAVE A PROBLEM").send();
    }
  }

  async redirectByCode(request, response) {
    try {
      const { code } = request.params;
      const id = UrlService.decode(code);
      const url = await this.repository.getUrlById(id);
      if (!url) response.status(400).json("ShortUrl don't exists").send();
      await this.repository.addOneToCounter(id);

      response.redirect(url.url);
    } catch (e) {
      response.status(400).json("HOUSTON WE HAVE A PROBLEM").send();
    }
  }

  async topOneHundred(request, response) {
    try {
      const top = await this.repository.getTopOneHundred();

      response.status(200).json(top).send();
    } catch (e) {
      response.status(400).json("HOUSTON WE HAVE A PROBLEM").send();
    }
  }
};
