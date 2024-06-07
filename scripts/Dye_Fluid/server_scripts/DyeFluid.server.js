// requires: create

(() => {
  const palette = {
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
    const { kubejs, create } = event.recipes;

    Object.keys(Color.DYE).forEach((colorName) => {
      // dye[item] + water[fluid] = dye[fluid]
      create
        .mixing(
          [Fluid.of(`dye_fluid:${colorName}_dye`, FluidAmounts.B)],
          [`${colorName}_dye`, Fluid.water(FluidAmounts.B)]
        )
        .id(`dye_fluid:mixing/${colorName}_dye`);

      // dye[fluid] + dye_base[item] = dye[item]
      create
        .filling([`${colorName}_dye`], ["#forge:dye/base", Fluid.of(`dye_fluid:${colorName}_dye`, FluidAmounts.B)])
        .id(`dye_fluid:filling/${colorName}_dye`);

      // color palette
      if (colorName in palette) {
        palette[colorName].forEach((ingredients) => {
          const inputs = Array.from(new Set(ingredients)).map((color) =>
            Fluid.of(`dye_fluid:${color}_dye`, ingredients.filter((i) => i == color).length * 100 * FluidAmounts.MB)
          );
          const totalCount = ingredients.length;

          create
            .mixing([Fluid.of(`dye_fluid:${colorName}_dye`, 100 * FluidAmounts.MB * totalCount)], inputs)
            .id(`dye_fluid:mixing/palette_${colorName}_dye`);
        });
      }
    });

    kubejs.shapeless("dye_fluid:dye_base", ["#forge:string", "#forge:wool"]).id(`dye_fluid:shapeless/dye_base`);
  });
})();
