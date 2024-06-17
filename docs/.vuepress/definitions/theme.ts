import { defaultTheme } from "@vuepress/theme-default";

const theme = defaultTheme({
  logo: "/images/logo.png",
  logoAlt: "",

  colorMode: "dark",
  colorModeSwitch: true,

  repo: "Mango-Minecraft-Project/Mango-KubeJScripts",
  editLinkPattern: ":repo/edit/:branch/:path",

  lastUpdated: true,
  contributors: true,

  navbar: [
    { text: "Discord", link: "https://evanhsieh0415.github.io/links/discord.html" },
  ],

  sidebar: [
    "/downloads/",
    "/links/",
    "/tips-and-tricks/",
    "/notes/",
    "/snippets/"
  ],

  editLinkText: "在 GitHub 編輯此頁面",
  lastUpdatedText: "最後更新",
  contributorsText: "作者",
  backToHome: "返回首頁",
  openInNewWindow: "在新視窗中開啟",
  toggleColorMode: "切換色彩模式",
  toggleSidebar: "切換選單列",
  tip: "提示",
  warning: "注意",
  danger: "警告",
  notFound: ["這個頁面不存在"],
  selectLanguageText: "選擇語言",
});

export default theme;
