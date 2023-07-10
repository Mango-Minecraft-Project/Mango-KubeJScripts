// priority: 0

if (checkConfigSwitch("dye-fluid")) {
  let { createCreativeTab } = global.functions.dev;
  let { toAmount } = global.functions.fluid;

  createCreativeTab("kubejs", "dye_fluid", "minecraft:lime_dye");

  global.addon.DyeFluid = {};
  let { DyeFluid } = global.addon;

  DyeFluid.colorTable = {
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
  };

  DyeFluid.getFluid = (colorName, amount) =>
    Fluid.of(`kubejs:${colorName}_dye_fluid`, toAmount(amount || 1000));

  StartupEvents.registry("fluid", (event) => {
    for (let [colorName, colorCode] of Object.entries(DyeFluid.colorTable)) {
      let fluidObject = event
        .create(`${colorName}_dye_fluid`)
        .thickTexture(colorCode)
        .flowingTexture("minecraft:block/water_flow")
        .stillTexture("minecraft:block/water_still")
        .tag("kubejs:dye_fluid")
        .tag("kubejs:dye_fluid/fluid")
        .tag("minecraft:water");

      fluidObject.flowingFluid
        .tag("kubejs:dye_fluid")
        .tag("kubejs:dye_fluid/fluid")
        .tag("minecraft:water");

      fluidObject.bucketItem
        .tag("kubejs:dye_fluid")
        .tag("kubejs:dye_fluid/bucket")
        .group("kubejs.dye_fluid");
    }
  });

  StartupEvents.registry("item", (event) => {
    let dye_base = event
      .create("dye_base")
      .texture("dye_fluid:item/color_base")
      .tag("kubejs:dye_fluid")
      .tag("kubejs:dye_fluid/dye_base")
      .group("kubejs.dye_fluid");

    dye_base.tag(Platform.isFabric() ? "c:dye_base" : "forge:dye/base");
  });
}
