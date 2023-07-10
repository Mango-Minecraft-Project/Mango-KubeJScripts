// priority: 100

const $CreativeTabRegistry = Java.loadClass(
  "dev.architectury.registry.CreativeTabRegistry"
);

global.addon = {};

global.variable = {
  CONFIG: {
    "loot-key": true,
    "infinity-tank": true,
    "saros-create-addon": true,
    "dye-fluid": true,
    "create-delight": false,
    "xekr-datapack": true,
    "more-expensive-recipes": false,
  },
  colors: [
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "blue",
    "light_blue",
    "cyan",
    "purple",
    "magenta",
    "pink",
    "brown",
    "black",
    "gray",
    "light_gray",
    "white",
  ],
};

global.functions = {
  fluid: {
    toAmount: (amount) => (Platform.isFabric ? amount * 81 : amount),
  },
  dev: {
    createCreativeTab: (namespace, path, itemId) => {
      return $CreativeTabRegistry.create(Utils.id(namespace, path), () =>
        Item.of(itemId)
      );
    },
    checkConfigSwitch: (namespace) => {
      return CONFIG[namespace] || CONFIG[namespace] == undefined;
    },
  },
};

const {
  variable: { CONFIG },
  functions: {
    dev: { checkConfigSwitch },
  },
} = global;
