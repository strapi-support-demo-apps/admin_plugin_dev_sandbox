import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'coordinates',
    plugin: 'tweeter',
    type: 'json',
  });
};

export default register;
