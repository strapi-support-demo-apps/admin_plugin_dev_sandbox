import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import TweetButton from './components/TweetButton';
import GeneralSettings from './components/Settings/General';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Tweeter',
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.createSettingSection(
      {
        id: 'tweeter-settings',
        intlLabel: { id: 'tweeter-settings-header', defaultMessage: 'Tweeter Plugin Settings' },
      },
      [
        {
          id: 'tweeter-general-settings',
          intlLabel: { id: 'tweeter-general-settings', defaultMessage: 'General' },
          to: '/tweeter',
          Component: GeneralSettings,
        },
      ]
    );

    app.customFields.register({
      name: 'coordinates',
      pluginId: PLUGIN_ID,
      type: 'json',
      intlLabel: {
        id: 'tweeter.field.label',
        defaultMessage: 'Coordinates',
      },
      intlDescription: {
        id: 'tweeter.field.description',
        defaultMessage: 'Latitude and Longitude of a location',
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import('./components/CoordinatesField').then((module) => ({
            default: module.CoordinatesField,
          })),
      },
    });
  },

  bootstrap(app: any) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: 'tweeter-tweet-button',
      Component: TweetButton,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
