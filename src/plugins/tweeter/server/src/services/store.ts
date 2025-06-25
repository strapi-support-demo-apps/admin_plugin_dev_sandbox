import type { Core } from '@strapi/strapi';

const store = ({ strapi }: { strapi: Core.Strapi }) => ({
  store() {
    return strapi.store({
      type: 'plugin',
      name: 'tweeter',
    });
  },
  async save(payload: any) {
    return await this.store().set({
      key: 'supported_apis',
      value: payload,
    });
  },
});

export default store;
