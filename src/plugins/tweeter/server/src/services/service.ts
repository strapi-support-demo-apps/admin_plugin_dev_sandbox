import type { Core } from '@strapi/strapi';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getConfig() {
    const config = await strapi.config.get('plugin::tweeter');
    return config;
  },
});

export default service;
