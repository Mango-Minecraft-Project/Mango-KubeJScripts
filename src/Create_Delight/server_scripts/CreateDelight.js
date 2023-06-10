if (checkConfigSwitch('create-delight')) {
  ServerEvents.recipes(event => {
    let knivesTag = Platform.isFabric ? "c:tools/knives" : "forge:tools/knives"

    event.forEachRecipe(
      { type: "farmersdelight:cutting", tool: { tag: knivesTag } },
      recipe => {
        let { originalRecipeIngredients, originalRecipeResult } = recipe
        event.recipes.create.deploying(
          [originalRecipeResult],
          [originalRecipeIngredients, `#${knivesTag}`]
        )
      }
    )
  })
}