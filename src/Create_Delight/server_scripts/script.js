if (checkConfigSwitch("create-delight")) {
  ServerEvents.recipes((event) => {
    const knivesTag = Platform.isFabric
      ? "c:tools/knives"
      : "forge:tools/knives";

    event.forEachRecipe({ type: "farmersdelight:cutting" }, (recipe) => {
      const originalRecipe = JSON.parse(recipe.json.toString());

      if (originalRecipe.tool?.tag == knivesTag) {
        event.recipes.create
          .deploying(
            [
              originalRecipe.result.map((item) => {
                let str = "tag" in item ? "#" + item.tag : item.item;
                if ("count" in item) {
                  str = item.count + "x " + str;
                }
                return Item.of(str);
              })[0],
            ],
            originalRecipe.ingredients.concat([`#${knivesTag}`])
          )
          .id("kubejs:create_delight/" + (recipe.getId() + "").path);
      }
    });
  });
}
