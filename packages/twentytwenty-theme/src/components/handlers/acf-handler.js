const acfOptionsHandler = {
  // This pattern gets an `option` param from the link.
  pattern: "acf/:option",

  // Parameters extracted from the link are included in `params`.
  func: async ({ route, params, state, libraries }) => {
    // 1. Get ACF option page from REST API using `option` from `params`.
    const response = await libraries.source.api.get({
      endpoint: `/acf/v3/options/${params.option}/`,
    });
    const option = await response.json();

    // 2. Add data to `source`.
    const data = state.source.get(route);
    Object.assign(data, { ...option, isAcfOptionsPage: true });
  },
};

export default acfOptionsHandler;