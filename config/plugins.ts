export default () => ({
  tweeter: {
    enabled: true,
    resolve: "./src/plugins/tweeter",
    config: {
      API_KEY: "SUPERSECRET_KEY",
    },
  },
});
