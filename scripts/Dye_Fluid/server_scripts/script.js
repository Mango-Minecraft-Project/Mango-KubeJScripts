if (checkConfigSwitch("dye-fluid")) {
  const {
    addon: { DyeFluid },
    functions: {
      fluid: { toAmount },
    },
  } = global.addon;

  DyeFluid.mixingTable = {
    orange: [["red", "yellow"]],
    green: [["blue", "yellow"]],
    lime: [["green", "white"]],
    light_blue: [["blue", "white"]],
    cyan: [["blue", "green"]],
    purple: [["blue", "red"]],
    magenta: [
      ["purple", "pink"],
      ["blue", "red", "red", "white"],
      ["blue", "red", "pink"],
      ["purple", "red", "white"],
    ],
    pink: [["red", "white"]],
    brown: [["red", "green", "green"]],
    black: [["red", "yellow", "blue"]],
    gray: [
      ["black", "white"],
      ["red", "yellow", "blue", "white"],
    ],
    light_gray: [
      ["black", "white", "white"],
      ["red", "yellow", "blue", "white", "white"],
    ],
  };

  ServerEvents.recipes((event) => {
    const { minecraft, create } = event.recipes;

    for (const colorName of Object.keys(DyeFluid.colorTable)) {
      create.mixing(
        // dye[item] + water[fluid] = dye[fluid]
        [DyeFluid.getFluid(colorName)],
        [
          `minecraft:${colorName}_dye`,
          Fluid.of("minecraft:water", toAmount(1000)),
        ]
      );
      create.filling(
        // dye[fluid] + dye_base[item] = dye[item]
        [`minecraft:${colorName}_dye`],
        ["kubejs:dye_base", DyeFluid.getFluid(colorName)]
      );

      if (colorName in DyeFluid.mixingTable) {
        // dye[fluid] + dye[fluid] + ... = dye[fluid]
        for (const ingredient of DyeFluid.mixingTable[colorName].values()) {
          const inputs = [];
          const totalCount = ingredient.length;
          for (const color of ingredient) {
            inputs.push(DyeFluid.getFluid(color, 100));
          }
          create.mixing(
            [DyeFluid.getFluid(colorName, 100 * totalCount)],
            inputs
          );
        }
      }
    }

    minecraft.crafting_shapeless("kubejs:dye_base", [
      "minecraft:string",
      "#minecraft:wool",
    ]);
  });
}
