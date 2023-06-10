// priority: 50

CustomRecipes.alloyForgery = {
  forging: function (Output, Inputs) {
    return new this.$forging(Output, Inputs)
  },
  $forging: function (Output, Inputs) {
    Output.priority = [Output.priority || Output.default]
    Output.count = Output.count || 1
    this.recipe = {
      type: 'alloy_forgery:forging',
      inputs: Inputs,
      output: Output,
      min_forge_tier: 1,
      fuel_per_tick: 5
    }
    return this
  }
}

Object.assign(
  CustomRecipes.alloyForgery.$forging.prototype,
  CustomRecipes.$base,
  {
    override: function (overrideObject) {
      this.recipe.override = overrideObject
      return this
    },
    minForgeTier: function (tier) {
      this.recipe.min_forge_tier = tier
      return this
    },
    fuelPerTick: function (tick) {
      this.recipe.fuel_per_tick = tick
      return this
    }
  }
)