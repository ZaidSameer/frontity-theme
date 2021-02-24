
const linkRewrite = {
   name: 'linkRewrite',
   priority: 10,
   test: ({ node, component, props}) =>
      component === "a",
   processor: ({ node, state }) => {
      if (node.props.href.startsWith(state.theme.sourceURL)) {
         node.props.href = node.props.href.replace(state.theme.sourceURL, "/");
      }

      return node;
   }
}

export default linkRewrite;