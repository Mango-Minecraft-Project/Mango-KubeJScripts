if (checkConfigSwitch('create-delight')) {
  ServerEvents.recipes((event) => {
    const knivesTag = Platform.isFabric ? "c:tools/knives" : "forge:tools/knives"

    event.forEachRecipe(
      { type: "farmersdelight:cutting" },
      recipe => {
        const originalRecipe = JSON.parse(recipe.json.toString())
        
        if (originalRecipe.tool?.tag == knivesTag) {
          event.recipes.create.deploying(
            originalRecipe.result,
            originalRecipe.ingredients.concat([`#${knivesTag}`])
          ).id('kubejs:create_delight/' + (recipe.getId() + '').path)
        }
      }
    )
  })
}
