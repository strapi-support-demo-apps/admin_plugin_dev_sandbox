const routes = [
  {
    method: 'POST',
    path: '/tweet_article/:documentId',
    handler: 'admin.tweetArticle',
    config: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/admin/save_settings',
    handler: 'admin.saveSettings',
  },

  {
    method: 'GET',
    path: '/admin/get_settings',
    handler: 'admin.getSettings',
  },
];

export default routes;
