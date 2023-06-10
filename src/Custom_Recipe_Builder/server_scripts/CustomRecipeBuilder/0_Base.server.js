// priority: 99

const CustomRecipes = {}

CustomRecipes.$base = {
  id: function (recipeId) {
    this.recipeId = recipeId
    return this
  },
  build: function (event) {
    return this.recipeId ? event.custom(this.recipe).id(this.recipeId) : event.custom(this.recipe)
  }
}