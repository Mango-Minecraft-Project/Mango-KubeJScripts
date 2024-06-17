import { markdownContainerPlugin } from "@vuepress/plugin-markdown-container";
import { catalogPlugin } from "@vuepress/plugin-catalog";
import { searchPlugin } from '@vuepress/plugin-search'

const plugins = [
  markdownContainerPlugin({
    type: "tip",
  }),
  catalogPlugin({}),
  searchPlugin({
    locales: {
      "/": {
        placeholder: "搜尋",
      },
    }
  })
];

export default plugins;
