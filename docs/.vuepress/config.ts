import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./definitions/theme";
import plugins from "./definitions/plugins";

export default defineUserConfig({
  base: "/",
  bundler: viteBundler(),
  head: [["meta", { charset: "utf-8" }]],
  theme,
  plugins,
  lang: "zh-TW",
  title: "芒果的 KubeJS 筆記本",
});
