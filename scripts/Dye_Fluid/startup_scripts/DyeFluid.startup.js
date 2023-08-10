// priority: 0

global.DyeFluid = {
  colorTable: {
    red: 0x861f20,
    orange: 0xd15a00,
    yellow: 0xe2a615,
    lime: 0x589e17,
    green: 0x455624,
    blue: 0x2a2c8b,
    light_blue: 0x2281c1,
    cyan: 0x146f83,
    purple: 0x5e1f98,
    magenta: 0x9f2f9b,
    pink: 0xc85f8b,
    brown: 0x5a371e,
    black: 0x090b10,
    gray: 0x32353b,
    light_gray: 0x74746e,
    white: 0xc2c8d0,
  },
};

StartupEvents.registry("fluid", (event) => {
  Object.entries(global.DyeFluid.colorTable).forEach((color) => {
    const [colorName, colorCode] = color;
    const fluidObject = event
      .create(`${colorName}_dye_fluid`)
      .thinTexture(colorCode)
      .tag("kubejs:dye_fluid")
      .tag("kubejs:dye_fluid/fluid")
      .tag("minecraft:water");

    fluidObject.flowingFluid
      .tag("kubejs:dye_fluid")
      .tag("kubejs:dye_fluid/fluid")
      .tag("minecraft:water");

    fluidObject.bucketItem
      .tag("kubejs:dye_fluid")
      .tag("kubejs:dye_fluid/bucket");
  });
});

StartupEvents.registry("item", (event) => {
  const dye_base = event
    .create("dye_base")
    // .displayName(Text.translate("item.kubejs.dye_base").string)
    .texture("dye_fluid:item/dye_base")
    .tag("kubejs:dye_fluid")
    .tag("kubejs:dye_fluid/dye_base")
    .group("kubejs.dye_fluid");

  dye_base.tag(Platform.isFabric() ? "c:dye_base" : "forge:dye/base");
});
