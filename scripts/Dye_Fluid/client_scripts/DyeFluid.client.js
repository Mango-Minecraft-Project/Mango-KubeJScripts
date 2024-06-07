// priority: 0

(() => {
  ClientEvents.highPriorityAssets((event) => {
    String.prototype.toTitleCase = function () {
      return this.split(/[-_ ]/)
        .map((i) => Utils.toTitleCase(i))
        .join(" ");
    };
    Object.keys(global.DyeFluid.colorTable).forEach((colorName) => {
      event.addLang(
        `fluid.kubejs.${colorName}_dye_fluid`,
        `${colorName} dye`
      );
      event.addLang(
        `item.kubejs.${colorName}_dye_fluid_bucket`,
        `${colorName} dye bucket`.toTitleCase()
      );
    });
  });
})
