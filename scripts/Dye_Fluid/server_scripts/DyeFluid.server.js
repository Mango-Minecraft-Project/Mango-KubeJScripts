// priority: 0
// requires: create
// requires: kubejs_create

const { DyeFluid } = global;

DyeFluid.colorPalette = {
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

  Object.keys(DyeFluid.colorTable).forEach((colorName) => {
    // dye[item] + water[fluid] = dye[fluid]
    create
      .mixing(
        [Fluid.of(`kubejs:${colorName}_dye_fluid`, FluidAmounts.B)],
        [
          `minecraft:${colorName}_dye`,
          Fluid.of("minecraft:water", FluidAmounts.B),
        ]
      )
      .id(`kubejs:mixing/${colorName}_dye_fluid`);

    // dye[fluid] + dye_base[item] = dye[item]
    create
      .filling(
        [`minecraft:${colorName}_dye`],
        [
          Platform.isForge() ? "#forge:dye/base" : "#c:dye_base",
          Fluid.of(`kubejs:${colorName}_dye_fluid`, FluidAmounts.B),
        ]
      )
      .id(`kubejs:filling/${colorName}_dye`);

    // color palette
    if (colorName in DyeFluid.colorPalette) {
      DyeFluid.colorPalette[colorName].forEach((ingredients) => {
        const inputs = Array.from(new Set(ingredients)).map((color) =>
          Fluid.of(
            `kubejs:${color}_dye_fluid`,
            ingredients.filter((i) => i == color).length * 100 * FluidAmounts.MB
          )
        );
        const totalCount = ingredients.length;

        create
          .mixing(
            [
              Fluid.of(
                `kubejs:${colorName}_dye_fluid`,
                100 * FluidAmounts.MB * totalCount
              ),
            ],
            inputs
          )
          .id(`kubejs:mixing/palette_${colorName}_dye`);
      });
    }
  });

  minecraft
    .crafting_shapeless("kubejs:dye_base", [
      "minecraft:string",
      "#minecraft:wool",
    ])
    .id(`kubejs:crafting_shapeless/dye_base`);
});
