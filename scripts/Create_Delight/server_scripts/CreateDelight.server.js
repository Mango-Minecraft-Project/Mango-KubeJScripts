// requires: create
// requires: farmersdelight
// requires: kubejs_create

(() => {
  ServerEvents.recipes((event) => {
    const knivesTag = "forge:tools/knives";

    event.forEachRecipe({ type: "farmersdelight:cutting" }, (recipe) => {
      const originalRecipe = JSON.parse(recipe.json.toString());

      if (originalRecipe.tool?.tag == knivesTag) {
        let path, count, chance;
        event.recipes.create
          .deploying(
            originalRecipe.result.map((item) => {
              path = "tag" in item ? `#${item.tag}` : item.item;
              count = item.count || 1;
              chance = item.chance || 1;

              return Item.of(path, count).withChance(chance);
            }),

            originalRecipe.ingredients.concat([`#${knivesTag}`])
          )
          .id("kubejs:create_delight/" + (recipe.getId() + "").path);
      }
    });
  });
})();
