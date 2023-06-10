// priority: 100

const $CreativeTabRegistry = Java.loadClass('dev.architectury.registry.CreativeTabRegistry')

global.addon = {}

global.variable = {
  CONFIG: {
    'loot-key': true,
    'infinity-tank': true,
    'saros-create-addon': true,
    'dye-fluid': true,
    'create-delight': false,
    'xekr-datapack': true,
    'more-expensive-recipes': false
  },
  colors: [
    'red', 'orange', 'yellow', 'lime',
    'green', 'blue', 'light_blue', 'cyan',
    'purple', 'magenta', 'pink', 'brown',
    'black', 'gray', 'light_gray', 'white'
  ]
}

global.functions = {
  fluid: {
    /**
     * if running in Fabric than return 81x else 1x
     * @param {Number} amount
     * @returns {Number}
     */
    toAmount: amount => Platform.isFabric ? amount * 81 : amount
  },
  dev: {
    tapKeys: (object, event) => {
      const keys = Object.keys(object).sort()
      if (event) { event.tell(keys) }
      else { console.log(keys) }
      return object
    },
    tap: (object, event) => {
      if (event) { event.tell(object) }
      else { console.log(object) }
      return object
    },
    createCreativeTab: (namespace, path, itemId) => {
      return $CreativeTabRegistry.create(Utils.id(namespace, path), () => Item.of(itemId))
    },
    /**
     * Return true if the namespace of config is available or undefined
     * @param {String} namespace
     * @returns {Boolean}
     */
    checkConfigSwitch: (namespace) => {
      return CONFIG[namespace] || CONFIG[namespace] == undefined
    }
  }
}


const { CONFIG } = global.variable
const { checkConfigSwitch } = global.functions.dev