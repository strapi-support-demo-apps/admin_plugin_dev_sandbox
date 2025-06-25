import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('tweeter')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
  tweetArticle(ctx) {
    ctx.body = 'Hi';
    ctx.status = 200;
  },
});

export default controller;
