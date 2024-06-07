// priority: 0

(() => {
  const dyes = [
    ["red", 0x861f20],
    ["orange", 0xd15a00],
    ["yellow", 0xe2a615],
    ["lime", 0x589e17],
    ["green", 0x455624],
    ["blue", 0x2a2c8b],
    ["light_blue", 0x2281c1],
    ["cyan", 0x146f83],
    ["purple", 0x5e1f98],
    ["magenta", 0x9f2f9b],
    ["pink", 0xc85f8b],
    ["brown", 0x5a371e],
    ["black", 0x090b10],
    ["gray", 0x32353b],
    ["light_gray", 0x74746e],
    ["white", 0xc2c8d0],
  ];

  StartupEvents.registry("fluid", (event) => {
    dyes.forEach(([colorName, colorCode]) => {
      const dyeFluidBuilder = event
        .create(`dye_fluid:${colorName}_dye`)
        .thinTexture(colorCode)
        .tag("dye_fluid:fluid")
        .tag("minecraft:water");

      dyeFluidBuilder.flowingFluid.tag("dye_fluid:fluid").tag("minecraft:water");
    });
  });

  StartupEvents.registry("item", (event) => {
    event
      .create("dye_fluid:dye_base")
      .texture("dye_fluid:item/dye_base")
      .tag("kubejs:dye_fluid/dye_base")
      .tag("forge:dye/base");
  });
})();
