const getWPConfig = {
  pattern: 'getWPConfig',
  func: async ({ route, state, libraries }) => {
    const response = await libraries.source.api.get({
      endpoint: `/`
    });
    const option = await response.json();

    const data = state.source.get(route);
    Object.assign(data, { ...option, isWpOptionsPage: true });
  }
}

export default getWPConfig;