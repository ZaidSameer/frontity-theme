const getFeaturedPosts = {
  pattern: "getFeaturedPosts",
  func: async ({ route, state, libraries }) => {
    const response = await libraries.source.api.get({
      endpoint: `featured-posts`,
    });
    const option = await response.json();
    const data = state.source.get(route);
    Object.assign(data, { ...option, isFeaturedPosts: true });
  },
};

export default getFeaturedPosts;