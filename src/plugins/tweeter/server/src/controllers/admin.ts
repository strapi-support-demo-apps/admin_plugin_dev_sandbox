import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async tweetArticle(ctx) {
    const { documentId } = ctx.request.params;
    // TODO: Do something with Plugin config
    const pluginConfig = await strapi.plugin('tweeter').service('service').getConfig();
    //
    const document = await strapi
      .documents('api::article.article')
      .findOne({ documentId, status: 'published' });

    const tweetObj = {
      description: 'Hey we wrote a new article',
      link: 'https://google.com',
      document: documentId,
      summary: document.documentId,
    };
    ctx.body = { status: 'ok', message: 'tweeted' };
    ctx.status = 200;
  },
  async saveSettings(ctx) {
    // load up the store from strapi's core store.
    try {
      await strapi.plugin('tweeter').service('store').save(ctx.request.body.value);
      ctx.body = { status: 'ok', message: 'saved' };
      ctx.status = 200;
    } catch (e) {
      console.log(e);
      ctx.body = 'Unable to save';
      ctx.status = 400;
    }
  },
  async getSettings(ctx) {
    const settings = await strapi
      .plugin('tweeter')
      .service('store')
      .store()
      .get({ key: 'supported_apis' });
    return { settings };
  },
});

export default controller;
