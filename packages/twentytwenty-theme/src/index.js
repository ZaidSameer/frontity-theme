import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import linkRewrite from "./processors/linkRewrite";
import menuHandler from "./components/handlers/menu-handler";
import getWPConfig from "./components/handlers/wp-config";
import acfOptionsHandler from "./components/handlers/acf-handler";
import getFeaturedPosts from "./components/handlers/featured-posts";

const twentyTwentyTheme = {
  name: "@frontity/twentytwenty-theme",
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      colors: {
        gray: {
          base: "#6D6D6D",
          light: "#DCD7CA",
          lighter: "#F5EFE0",
        },
        primary: "#cd2653",
        headerBg: "#ffffff",
        footerBg: "#ffffff",
        bodyBg: "#f5efe0",
      },
      
      mode: 'light',
      isSubmenuOpen: {},
      // Whether to show the search button in page header
      showSearchInHeader: true,
      // Menu links to display in the header
      menu: [],
      // State for the menu on mobile
      isMobileMenuOpen: false,
      // State for the search modal on mobile
      isSearchModalOpen: false,
      // Whether to show all post content or only excerpt (summary) in archive view
      showAllContentOnArchive: false,
      // Settings for the featured media (image or video)
      featuredMedia: {
        // Whether to show it on archive view
        showOnArchive: true,
        // Whether to show it on post
        showOnPost: true,
      },
      // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
      autoPrefetch: "all",
      fontSets: "all",
    },
  },

  actions: {
    theme: {
      // beforeSSR: getNameAndDescription,
      beforeSSR: async ({ state, actions }) => {
        await Promise.all(
          [
            getWPConfig,
            actions.source.fetch("acf/options"),
            actions.source.fetch("acf/identity"),
            actions.source.fetch("getWPConfig"),
            actions.source.fetch("menu/header-menu"),
            actions.source.fetch("getFeaturedPosts"),
          ]
        );
        await Promise.all(
          data.items.map(({link}) => link).map(link => actions.source.fetch(link))
        );
      },
      init: ({ libraries }) => {              
        libraries.source.handlers.push(getFeaturedPosts);
      },
      beforeCSR: async ({ libraries }) => {
        libraries.html2react.processors.push(image);
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      openSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = true;
      },
      closeSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = false;
      },
      setDarkMode: ({ state }) => {
        // console.log('darkMode!');
        state.theme.mode = 'dark';

        if (typeof window !== "undefined") {
          localStorage.setItem(
            'theme_color_mode',
            'dark'
          );
        }
      },
      setLightMode: ({ state }) => {
        // console.log('lightMode!');
        state.theme.mode = 'light';

        if (typeof window !== "undefined") {
          localStorage.setItem(
            'theme_color_mode',
            'light'
          );
        }
      },
    },
  },
  libraries: {
    html2react: {
      processors: [image, iframe, linkRewrite],
    },
    source: {
      handlers: [acfOptionsHandler, getWPConfig, menuHandler, getFeaturedPosts],
    }
  },
};

export default twentyTwentyTheme;
